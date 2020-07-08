const express = require('express');
const common = require('../lib/common');
const colors = require('colors');
const { indexProducts } = require('../lib/indexing');
const { validateJson } = require('../lib/schema');
const router = express.Router();
const fs = require('fs');
const path = require('path');

router.get('/admin/product/:page?', async (req, res) => {
    let pageNum = 1;
    if(req.params.page){
        pageNum = req.params.page; 
    }

    // Get our paginated data
    const products = await common.paginateData(false, req, pageNum, 'products', {}, { productAddedDate: -1 });

    res.status(200).json({
        results: products.data,
        totalItemCount: products.totalItems,
        pageNum
    })
});

// insert new product form action
router.post('/admin/product/insert', async (req, res) => {
    const db = req.app.db;

    // Process supplied options
    let productOptions = req.body.productOptions;
    if (productOptions && typeof productOptions !== 'object') {
        try {
            productOptions = JSON.parse(req.body.productOptions);
        } catch (ex) {
            console.log('Failure to parse options');
        }
    }

    const doc = {
        productPermalink: req.body.productPermalink,
        productTitle: req.body.productTitle,
        productPrice: req.body.productPrice,
        productDescription: req.body.productDescription,
        productPublished: common.convertBool(req.body.productPublished),
        productTags: req.body.productTags,
        productOptions: productOptions || null,
        productComment: common.checkboxBool(req.body.productComment),
        productAddedDate: new Date(),
        productStock: common.safeParseInt(req.body.productStock) || null,
        productStockDisable: common.convertBool(req.body.productStockDisable)
    };

    // Validate the body again schema
    const schemaValidate = validateJson('newProduct', doc);
    if (!schemaValidate.result) {
        console.log('schemaValidate errors', schemaValidate.errors);
        res.status(400).json(schemaValidate.errors);
        return;
    }

    // Check permalink doesn't already exist
    const product = await db.products.countDocuments({ productPermalink: req.body.productPermalink });
    if (product > 0 && req.body.productPermalink !== '') {
        res.status(400).json({ message: 'Permalink already exists. Pick a new one.' });
        return;
    }

    try {
        const newDoc = await db.products.insertOne(doc);
        // get the new ID
        const newId = newDoc.insertedId;

        // add to lunr index
        indexProducts(req.app)
            .then(() => {
                res.status(200).json({
                    message: 'New product successfully created',
                    productId: newId
                });
            });
    } catch (ex) {
        console.log(colors.red('Error inserting document: ' + ex));
        res.status(400).json({ message: 'Error inserting document' });
    }
});

router.post('/admin/product/edit', async (req, res) => {
    const db = req.app.db;

    const images = await common.getImages(req.body.id, req, res);
    const product = await db.products.findOne({ _id: common.getId(req.body.id) });
    if (!product) {
        res.status(400).json({ message: 'Product not found' });
        return;
    }

    let options = {};
    if (product.productOptions) {
        options = product.productOptions;
        if (typeof product.productOptions !== 'object') {
            options = JSON.parse(product.productOptions);
        }
    }

    res.status(200).json({ product, images });
    // res.status(400).json({ message: 'Product not found' });
    return;
});

router.post('/admin/product/update', async (req, res) => {
    const db = req.app.db;

    const product = await db.products.findOne({ _id: common.getId(req.body.productId) });

    if (!product) {
        res.status(400).json({ message: 'Failed to update product' });
        return;
    }

    const count = await db.products.countDocuments({ productPermalink: req.body.productPermalink, _id: { $ne: common.getId(product._id) } });
    if (count > 0 && req.body.productPermalink !== '') {
        res.status(400).json({ message: 'Permalink already exists. Pick a new one.' });
        return;
    }

    const images = await common.getImages(req.body.productId, req, res);
    // Process supplied options
    let productOptions = req.body.productOptions;
    if (productOptions && typeof productOptions !== 'object') {
        try {
            productOptions = JSON.parse(req.body.productOptions);
        } catch (ex) {
            console.log('Failure to parse options');
        }
    }

    const productDoc = {
        productId: req.body.productId,
        productPermalink: req.body.productPermalink,
        productTitle: req.body.productTitle,
        productPrice: req.body.productPrice,
        productDescription: req.body.productDescription,
        productPublished: common.convertBool(req.body.productPublished),
        productTags: req.body.productTags,
        productOptions: productOptions || null,
        productComment: common.checkboxBool(req.body.productComment),
        productStock: common.safeParseInt(req.body.productStock) || null,
        productStockDisable: common.convertBool(req.body.productStockDisable)
    };

    // Validate the body again schema
    const schemaValidate = validateJson('editProduct', productDoc);
    if (!schemaValidate.result) {
        res.status(400).json(schemaValidate.errors);
        return;
    }

    // Remove productId from doc
    delete productDoc.productId;

    // if no featured image
    if (!product.productImage) {
        if (images.length > 0) {
            productDoc.productImage = images[0].path;
        } else {
            productDoc.productImage = '/uploads/placeholder.png';
        }
    } else {
        productDoc.productImage = product.productImage;
    }

    try {
        await db.products.updateOne({ _id: common.getId(req.body.productId) }, { $set: productDoc }, {});
        // Update the index
        indexProducts(req.app)
            .then(() => {
                res.status(200).json({ message: 'Successfully saved', product: productDoc });
            });
    } catch (ex) {
        res.status(400).json({ message: 'Failed to save. Please try again' });
    }
});

// delete a product
router.post('/admin/product/delete', async (req, res) => {
    const db = req.app.db;

    // remove the product
    await db.products.deleteOne({ _id: common.getId(req.body.productId) }, {});

    // delete any images and folder
    rimraf('public/uploads/' + req.body.productId, (err) => {
        if (err) {
            console.info(err.stack);
            res.status(400).json({ message: 'Failed to delete product' });
        }

        // re-index products
        indexProducts(req.app)
            .then(() => {
                res.status(200).json({ message: 'Product successfully deleted' });
            });
    });
});

// update the published state
router.post('/admin/product/publishedState', async (req, res) => {
    const db = req.app.db;

    try {
        await db.products.updateOne({ _id: common.getId(req.body.id) }, { $set: { productPublished: common.convertBool(req.body.state) } }, { multi: false });
        res.status(200).json({ message: 'Published state updated' });
    } catch (ex) {
        console.error(colors.red('Failed to update the published state: ' + ex));
        res.status(400).json({ message: 'Published state not updated' });
    }
});

// set as main product image
router.post('/admin/product/setasmainimage', async (req, res) => {
    const db = req.app.db;

    try{
        // update the productImage to the db
        await db.products.updateOne({ _id: common.getId(req.body.productId) }, { $set: { productImage: req.body.productImage } }, { multi: false });
        res.status(200).json({ message: 'Main image successfully set' });
    }catch(ex){
        res.status(400).json({ message: 'Unable to set as main image. Please try again.' });
    }
});

// deletes a product image
router.post('/admin/product/deleteimage', async (req, res) => {
    const db = req.app.db;

    // get the productImage from the db
    const product = await db.products.findOne({ _id: common.getId(req.body.productId) });
    if(!product){
        res.status(400).json({ message: 'Product not found' });
        return;
    }
    if(req.body.productImage === product.productImage){
        // set the productImage to null
        await db.products.updateOne({ _id: common.getId(req.body.productId) }, { $set: { productImage: null } }, { multi: false });

        // remove the image from disk
        fs.unlink(path.join('public', req.body.productImage), (err) => {
            if(err){
                res.status(400).json({ message: 'Image not removed, please try again.' });
            }else{
                res.status(200).json({ message: 'Image successfully deleted' });
            }
        });
    }else{
         // remove the image from disk
         fs.unlink(path.join('public', req.body.productImage), (err) => {
            if(err){
                res.status(400).json({ message: 'Image not removed, please try again.' });
            }else{
                res.status(200).json({ message: 'Image successfully deleted' });
            }
        });
    }
});

module.exports = router;