const _ = require('lodash');
const uglifycss = require('uglifycss');
const colors = require('colors');
const cheerio = require('cheerio');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const glob = require('glob');
const async = require('async');
const nodemailer = require('nodemailer');
const sanitizeHtml = require('sanitize-html');
const escape = require('html-entities').AllHtmlEntities;
const mkdirp = require('mkdirp');
const ObjectId = require('mongodb').ObjectID;
const countryList = require('countries-list');

// Parse country list once
const countryArray = [];
Object.keys(countryList.countries).forEach((country) => {
    countryArray.push(countryList.countries[country].name);
});

// Allowed mime types for product images
const allowedMimeType = [
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/bmp',
    'image/webp'
];

const fileSizeLimit = 10485760;

// common functions
const mongoSanitize = (param) => {
    if (param instanceof Object) {
        for (const key in param) {
            if (/^\$/.test(key)) {
                delete param[key];
            }
        }
    }
    return param;
};

const safeParseInt = (param) => {
    if (param) {
        try {
            return parseInt(param);
        } catch (ex) {
            return param;
        }
    } else {
        return param;
    }
};

const convertBool = (value) => {
    if (value === 'true' || value === true) {
        return true;
    }
    return false;
};

const checkboxBool = (param) => {
    if (param && param === 'on') {
        return true;
    }
    if (param && param === 'true') {
        return true;
    }
    return false;
};

const getId = (id) => {
    if (id) {
        if (id.length !== 24) {
            return id;
        }
    }
    return ObjectId(id);
};

const getConfig = () => {
    let config = JSON.parse(fs.readFileSync(path.join(__dirname, '../config', 'settings.json'), 'utf8'));
    const localConfigFilePath = path.join(__dirname, '../config', 'settings-local.json');

    // Check for local config file and merge with base settings
    if (fs.existsSync(localConfigFilePath)) {
        const localConfigFile = JSON.parse(fs.readFileSync(localConfigFilePath, 'utf8'));
        config = Object.assign(config, localConfigFile);
    }

    // Override from env.yaml environment file
    Object.keys(config).forEach((configKey) => {
        if (process.env[configKey]) {
            config[configKey] = process.env[configKey];
        }
    });

    config.customCss = typeof config.customCss !== 'undefined' ? escape.decode(config.customCss) : null;
    config.footerHtml = typeof config.footerHtml !== 'undefined' ? escape.decode(config.footerHtml) : null;
    config.googleAnalytics = typeof config.googleAnalytics !== 'undefined' ? escape.decode(config.googleAnalytics) : null;

    // setup theme
    config.themeViews = '';
    if (typeof config.theme === 'undefined' || config.theme === '') {
        config.theme = 'Cloth'; // Default to Cloth theme
    }

    config.themeViews = '../views/themes/' + config.theme + '/';

    // set the environment for files
    config.env = '.min';
    if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === undefined) {
        config.env = '';
    }

    // load modules
    try {
        config.modules.loaded = {};
        Object.keys(config.modules.enabled).forEach((mod) => {
            config.modules.loaded[mod] = require(`./modules/${config.modules.enabled[mod]}`);
        });
    } catch (ex) {
        console.log('Could not load modules, check your config.', ex);
        process.exit(1);
    }

    return config;
};

/**
 * 
 * @param {boolean} frontend whether or not this is an front or admin call
 * @param {req} req express `req` object
 * @param {integer} page The page number
 * @param {string} collection The collection to search
 * @param {object} query The mongo query
 * @param {object} sort The mongo sort
 */
const paginateData = (frontend, req, page, collection, query, sort) => {
    const db = req.app.db;
    const config = getConfig();
    let numberItems = 10;

    if (frontend) {
        numberItems = config.productsPerPage ? config.productsPerPage : 6;
    }

    let skip = 0;
    if (page > 1) {
        skip = (page - 1) * numberItems;
    }

    if (!query) {
        query = {};
    }
    if (!sort) {
        sort = {};
    }

    // Run our queries
    return Promise.all([
        db[collection].find(query).skip(skip).limit(parseInt(numberItems)).sort(sort).toArray(),
        db[collection].countDocuments(query)
    ])
        .then((result) => {
            const returnData = { data: result[0], totalItems: result[1] };
            return returnData;
        })
        .catch((err) => {
            throw new Error('Error retrieving paginated data');
        });
};

const clearSessionValue = (session, sessionVar) => {
    let temp;
    if (session) {
        temp = session[sessionVar];
        session[sessionVar] = null;
    }
    return temp;
};

const getImages = async (id, req, res, callback) => {
    const db = req.app.db;

    const product = await db.products.findOne({ _id: getId(id) });
    if (!product) {
        return [];
    }

    const files = await glob.sync(`public/uploads/${product._id.toString()}/**`, { nosort: true });

    files.sort();

    const fileList = [];

    for (let i = 0; i < files.length; i++) {
        if (fs.lstatSync(files[i]).isDirectory() === false) {
            const file = {
                id: i,
                path: files[i].substring(6)
            }
            if (product.productImage === files[i].substring(6)) {
                file.productImage = true;
            }
            fileList.push(file);
        }
    }
    return fileList;
};

const clearCustomer = (req) => {
    // Clear our session
    req.session.customerPresent = null;
    req.session.customerEmail = null;
    req.session.customerFirstname = null;
    req.session.customerLastname = null;
    req.session.customerAddress1 = null;
    req.session.customerAddress2 = null;
    req.session.customerCountry = null;
    req.session.customerState = null;
    req.session.customerPostcode = null;
    req.session.customerPhone = null;
    req.session.orderComment = null;
};

const checkDirectorySync = (directory) => {
    try {
        fs.statSync(directory);
    } catch (e) {
        try {
            fs.mkdirSync(directory);
        } catch (err) {
            mkdirp.sync(directory);// error : directory & sub directories to be newly created
        }
    }
};

module.exports = {
    allowedMimeType,
    fileSizeLimit,
    getImages,
    checkboxBool,
    safeParseInt,
    convertBool,
    getConfig,
    getId,
    mongoSanitize,
    clearCustomer,
    checkDirectorySync,
    paginateData
}
