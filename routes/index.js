const express = require('express');
const router = express.Router();
const colors = require('colors');
// const hash = require('object-hash');
// const stripHtml = require('string-strip-html');
const moment = require('moment');
const _ = require('lodash');
const {
    getImages,
    getId
} = require('../lib/common');

// show an individual product
router.post('/product', async (req, res) => {
    const db = req.app.db;
    const config = req.app.config;
    const productsIndex = req.app.productsIndex;

    const product = await db.products.findOne({ $or: [{ _id: getId(req.body.id) }, { productPermalink: req.body.id }] });
    if(!product){
        res.status(400).json({ message: 'Order not found' });
        return;
    }
    if(product.productPublished === false){
        res.status(400).json({ message: 'Product not found' });
        return;
    }
    const productOptions = product.productOptions;

    // If JSON query param return json instead
    if(req.query.json === 'true'){
        res.status(200).json(product);
        return;
    }

    // show the view
    const images = await getImages(product._id, req, res);

    // Related products
    let relatedProducts = {};
    if(config.showRelatedProducts){
        const lunrIdArray = [];
        const productTags = product.productTags.split(',');
        const productTitleWords = product.productTitle.split(' ');
        const searchWords = productTags.concat(productTitleWords);
        searchWords.forEach((word) => {
            productsIndex.search(word).forEach((id) => {
                lunrIdArray.push(getId(id.ref));
            });
        });
        relatedProducts = await db.products.find({
            _id: { $in: lunrIdArray, $ne: product._id }
        }).limit(4).toArray();
    }

    res.status(200).json({ product, images, relatedProducts });
});

module.exports = router;