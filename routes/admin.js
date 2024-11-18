const express = require('express');
const common = require('../lib/common');
const { restrict, checkAccess } = require('../lib/auth');
const escape = require('html-entities').AllHtmlEntities;
const colors = require('colors');
const bcrypt = require('bcryptjs');
const moment = require('moment');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const mime = require('mime-type/with-db');
const { validateJson } = require('../lib/schema');
const ObjectId = require('mongodb').ObjectID;
const router = express.Router();

// Regex
const emailRegex = /\S+@\S+\.\S+/;
const numericRegex = /^\d*\.?\d*$/;

// logout
router.get('/admin/logout', (req, res) => {
    req.session.user = null;
    req.session.message = null;
    req.session.messageType = null;
    res.redirect('/');
});

// login form
router.get('/admin/check_setup', async (req, res) => {
    const db = req.app.db;

    const userCount = await db.users.countDocuments({});
    // console.log("userCount", userCount)
    if (userCount && userCount > 0) {
        // req.session.needsSetup = false;

        res.status(200).send({ needSetup: false })
    } else {
        // req.session.needsSetup = false;

        res.status(200).send({ needSetup: true })
    }
})

// login the user and check the password
router.post('/admin/login', async (req, res) => {
    const db = req.app.db;
    const user = await db.users.findOne({ userEmail: common.mongoSanitize(req.body.email) });
    if (!user || user === null) {
        res.status(400).json({ message: 'A user with that email does not exist.' });
        return;
    }

    // we have a user under that email so we compare the password
    bcrypt.compare(req.body.password, user.userPassword)
        .then((result) => {
            if (result) {
                req.session.user = req.body.email;
                req.session.usersName = user.usersName;
                req.session.userId = user._id.toString();
                req.session.isAdmin = user.isAdmin;
                res.status(200).json({
                    message: 'Login successful',
                    user: user
                });
                return;
            }
            // password is not correct
            res.status(400).json({
                message: 'Access denied. Check password and try again.'
            });
        });
});

// insert a user
router.post('/admin/setup_action', async (req, res) => {
    const db = req.app.db;

    const doc = {
        usersName: req.body.usersName,
        userEmail: req.body.userEmail,
        userPassword: bcrypt.hashSync(req.body.userPassword, 10),
        isAdmin: true,
        isOwner: true
    };

    // check for users
    const userCount = await db.users.countDocuments({});
    if (userCount === 0) {
        // email is ok to be used.
        try {
            await db.users.insertOne(doc);
            res.status(200).json({ message: 'User account inserted' });
            return;
        } catch (ex) {
            console.error(colors.red('Failed to insert user: ' + ex));
            res.status(200).json({ message: 'Setup failed' });
            return;
        }
    }
    res.status(200).json({ message: 'Already setup.' });
});

const upload = multer({ dest: 'public/uploads/' });
router.post('/admin/file/upload', upload.single('uploadFile'), async (req, res) => {
    const db = req.app.db;

    if (req.file) {
        const file = req.file;

        // Get the mime type of the file
        const mimeType = mime.lookup(file.originalname);

        // Check for allowed mime type and file size
        if (!common.allowedMimeType.includes(mimeType) || file.size > common.fileSizeLimit) {
            // Remove temp file
            fs.unlinkSync(file.path);

            // Return error
            res.status(400).json({ message: 'File type not allowed or too large. Please try again.' });
            return;
        }

        // get the product form the DB
        const product = await db.products.findOne({ _id: common.getId(req.body.productId) });
        if (!product) {
            // delete the temp file.
            fs.unlinkSync(file.path);

            // Return error
            res.status(400).json({ message: 'File upload error. Please try again.' });
            return;
        }

        const productPath = product._id.toString();
        const uploadDir = path.join('public/uploads', productPath);

        // Check directory and create (if needed)
        common.checkDirectorySync(uploadDir);

        const source = fs.createReadStream(file.path);
        const dest = fs.createWriteStream(path.join(uploadDir, file.originalname.replace(/ /g, '_')));

        // save the new file
        source.pipe(dest);
        source.on('end', () => { 
            // delete the temp file.
            fs.unlinkSync(file.path);
        });

        const imagePath = path.join('/uploads', productPath, file.originalname.replace(/ /g, '_'));

        // if there isn't a product featured image, set this one
        if (!product.productImage) {
            await db.products.updateOne({ _id: common.getId(req.body.productId) }, { $set: { productImage: imagePath } }, { multi: false });
        }

        // Return success message
        res.status(200).json({ message: 'File uploaded successfully' });
        return;
    }
    // Return error
    res.status(400).json({ message: 'File upload error. Please try again.' });
});



module.exports = router;