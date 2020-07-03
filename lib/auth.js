const ObjectId = require('mongodb').ObjectID;
const _ = require('lodash');

const restrictedRoutes = [
    { route: '/admin/product/new', response: 'redirect' },
    { route: '/admin/product/insert', response: 'redirect' },
    { route: '/admin/product/edit/:id', response: 'redirect' },
    { route: '/admin/product/update', response: 'redirect' },
    { route: '/admin/product/delete/:id', response: 'redirect' },
    { route: '/admin/product/publishedState', response: 'json' },
    { route: '/admin/product/setasmainimage', response: 'json' },
    { route: '/admin/product/deleteimage', response: 'json' },
    { route: '/admin/product/removeoption', response: 'json' },
    { route: '/admin/order/statusupdate', response: 'json' },
    { route: '/admin/settings/update', response: 'json' },
    { route: '/admin/settings/pages/new', response: 'redirect' },
    { route: '/admin/settings/pages/edit/:page', response: 'redirect' },
    { route: '/admin/settings/pages', response: 'json' },
    { route: '/admin/settings/page/delete/:page', response: 'json' },
    { route: '/admin/settings/menu/new', response: 'json' },
    { route: '/admin/settings/menu/update', response: 'json' },
    { route: '/admin/settings/menu/delete', response: 'json' },
    { route: '/admin/settings/menu/saveOrder', response: 'json' },
    { route: '/admin/file/upload', response: 'json' }
];

const restrict = (req, res, next) => {
    checkLogin(req, res, next);
};

const checkLogin = async (req, res, next) => {
    const db = req.app.db;
    // if not protecting we check for public pages and don't checkLogin
    if (req.session.needSetup === true) {
        res.redirect('/admin/setup');
        return;
    }

    // If API key, check for a user
    if (req.header.apiKey) {
        try {
            const user = await db.users.findOne({
                apiKey: ObjectId(req.header.apiKey),
                isAdmin: true
            });
            if (!user) {
                res.status(400).json({ message: 'Access denied' });
                return;
            }
            // Set API authenticated in the req
            req.apiAuthenticated = true;
            next();
            return;
        } catch (ex) {
            res.status(400).json({ message: 'Access denied' });
            return;
        }
    }

    if (req.session.user) {
        next();
        return;
    }
    res.redirect('/admin/login');
}

// Middleware to check for admin access for certain route
const checkAccess = (req, res, next) => {
    if (req.session.isAdmin === false) {
        res.status(400).json({ message: 'Unauthorised. Please refer to administrator.' });
    } else {
        next();
    }
};

module.exports = {
    restrict,
    checkLogin,
    checkAccess
};