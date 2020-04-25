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
    if(param instanceof Object){
        for(const key in param){
            if(/^\$/.test(key)){
                delete param[key];
            }
        }
    }
    return param;
};

const safeParseInt = (param) => {
    if(param){
        try{
            return parseInt(param);
        }catch(ex){
            return param;
        }
    }else{
        return param;
    }
};

const convertBool = (value) => {
    if(value === 'true' || value === true){
        return true;
    }
    return false;
};

const getId = (id) => {
    if(id){
        if(id.length !== 24){
            return id;
        }
    }
    return ObjectId(id);
};

const getConfig = () => {
    let config = JSON.parse(fs.readFileSync(path.join(__dirname, '../config', 'settings.json'), 'utf8'));
    const localConfigFilePath = path.join(__dirname, '../config', 'settings-local.json');

    // Check for local config file and merge with base settings
    if(fs.existsSync(localConfigFilePath)){
        const localConfigFile = JSON.parse(fs.readFileSync(localConfigFilePath, 'utf8'));
        config = Object.assign(config, localConfigFile);
    }

    // Override from env.yaml environment file
    Object.keys(config).forEach((configKey) => {
        if(process.env[configKey]){
            config[configKey] = process.env[configKey];
        }
    });

    config.customCss = typeof config.customCss !== 'undefined' ? escape.decode(config.customCss) : null;
    config.footerHtml = typeof config.footerHtml !== 'undefined' ? escape.decode(config.footerHtml) : null;
    config.googleAnalytics = typeof config.googleAnalytics !== 'undefined' ? escape.decode(config.googleAnalytics) : null;

    // setup theme
    config.themeViews = '';
    if(typeof config.theme === 'undefined' || config.theme === ''){
        config.theme = 'Cloth'; // Default to Cloth theme
    }

    config.themeViews = '../views/themes/' + config.theme + '/';

    // set the environment for files
    config.env = '.min';
    if(process.env.NODE_ENV === 'development' || process.env.NODE_ENV === undefined){
        config.env = '';
    }

    // load modules
    try{
        config.modules.loaded = {};
        Object.keys(config.modules.enabled).forEach((mod) => {
            config.modules.loaded[mod] = require(`./modules/${config.modules.enabled[mod]}`);
        });
    }catch(ex){
        console.log('Could not load modules, check your config.', ex);
        process.exit(1);
    }

    return config;
};

const clearSessionValue = (session, sessionVar) => {
    let temp;
    if(session) {
        temp = session[sessionVar];
        session[sessionVar] = null;
    }
    return temp;
}


module.exports = {
    getConfig,
    getId
}
