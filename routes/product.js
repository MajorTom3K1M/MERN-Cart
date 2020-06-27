const express = require('express');
const common = require('../lib/common');
const { validateJson } = require('../lib/schema')

// insert new product form action
router.post('/admin/product/insert', restrict, checkAccess, async (req, res) => {
    const db = req.app.db;

    // Process supplied options
    let productOptions = req.body.productOptions;
    if(productOptions && typeof productOptions !== 'object'){
        try{
            productOptions = JSON.parse(req.body.productOptions);
        }catch(ex){
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
    if(!schemaValidate.result){
        console.log('schemaValidate errors', schemaValidate.errors);
        res.status(400).json(schemaValidate.errors);
        return;
    }

    // Check permalink doesn't already exist
    const product = await db.products.countDocuments({ productPermalink: req.body.productPermalink });
    if(product > 0 && req.body.productPermalink !== ''){
        res.status(400).json({ message: 'Permalink already exists. Pick a new one.' });
        return;
    }

    try{
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
    }catch(ex){
        console.log(colors.red('Error inserting document: ' + ex));
        res.status(400).json({ message: 'Error inserting document' });
    }
});