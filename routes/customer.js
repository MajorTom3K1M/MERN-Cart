const express = require('express');
const router = express.Router();
const colors = require('colors');
const randtoken = require('rand-token');
const bcrypt = require('bcryptjs');
const common = require('../lib/common');
const rateLimit = require('express-handlebars');
const { indexCustomers } = require('../lib/indexing');
const { validateJson } = require('../lib/schema');
const { restrict } = require('../lib/auth');

const apiLimiter = rateLimit({
    windowMs: 300000,
    max: 5
});

// insert a customer
router.post('/customer/create', async (req, res) => {
    const db = req.app.db;

    const customerObj = {
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        address1: req.body.address1,
        address2: req.body.address2,
        country: req.body.country,
        state: req.body.state,
        postcode: req.body.postcode,
        phone: req.body.phone,
        password: bcrypt.hashSync(req.body.password, 10),
        created: new Date()
    };

    // check for existing customer
    const customer = await db.customer.findOne({ email: req.body.email });
    if (customer) {
        res.status(400).json({
            message: 'A customer already exists with that email address'
        });
        return;
    }
    // email is ok to be used.
    try {
        const newCustomer = await db.customers.insertOne(customerObj);
        indexCustomers(req.app)
            .then(() => {
                // Return the new customer
                const customerReturn = newCustomer.ops[0];
                delete customerReturn.password;

                // Set the customer into the session
                req.session.customerPresent = true;
                req.session.customerEmail = customerReturn.email;
                req.session.customerFirstname = customerReturn.firstName;
                req.session.customerLastname = customerReturn.lastName;
                req.session.customerAddress1 = customerReturn.address1;
                req.session.customerAddress2 = customerReturn.address2;
                req.session.customerCountry = customerReturn.country;
                req.session.customerState = customerReturn.state;
                req.session.customerPostcode = customerReturn.postcode;
                req.session.customerPhone = customerReturn.phone;
                req.session.orderComment = customerReturn.orderComment;

                // Return customer oject
                res.status(200).json(customerReturn);
            });
    } catch (ex) {
        console.error(colors.red('Failed to insert customer: ', ex));
        res.status(400).json({
            message: 'Customer creation failed.'
        });
    }
});

router.post('/customer/save', async (req, res) => {
    const customerObj = {
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        address1: req.body.address1,
        address2: req.body.address2,
        country: req.body.country,
        state: req.body.state,
        postcode: req.body.postcode,
        phone: req.body.phone
    };

    const schemaResult = validateJson('saveCustomer', customerObj);
    if (!schemaResult.result) {
        res.status(400).json(schemaResult.errors);
        return;
    }

    // Set the customer into the session
    req.session.customerPresent = true;
    req.session.customerEmail = customerObj.email;
    req.session.customerFirstname = customerObj.firstName;
    req.session.customerLastname = customerObj.lastName;
    req.session.customerAddress1 = customerObj.address1;
    req.session.customerAddress2 = customerObj.address2;
    req.session.customerCountry = customerObj.country;
    req.session.customerState = customerObj.state;
    req.session.customerPostcode = customerObj.postcode;
    req.session.customerPhone = customerObj.phone;
    req.session.orderComment = req.body.orderComment;

    res.status(200).json(customerObj);
});

// Update a customer
router.post('/admin/customer/update', restrict, async (req, res) => {
    const db = req.app.db;

    const customerObj = {
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        address1: req.body.address1,
        address2: req.body.address2,
        country: req.body.country,
        state: req.body.state,
        postcode: req.body.postcode,
        phone: req.body.phone
    };

    if (req.body.password) { customerObj.password = bcrypt.hashSync(req.body.password, 10) }

    const schemaResult = validateJson('editCustomer', customerObj);
    if (!schemaResult.result) {
        console.log('errors', schemaResult.errors);
        res.status(400).json(schemaResult.errors);
        return;
    }

    // check for existing customer
    const customer = await db.customer.findOne({ _id: common.getId(req.body.customerId) });
    if (!customer) {
        res.status(400).json({
            message: 'Customer not found'
        });
        return;
    }
    // Update customer
    try {
        const updatedCustomer = await db.customers.findOneAndUpdate(
            { _id: common.getId(req.body.customerId) },
            {
                $set: customerObj
            },
            { multi: false, returnOriginal: false }
        );
        indexCustomers(req.app)
            .then(() => {
                const returnCustomer = updatedCustomer.value;
                delete returnCustomer.password;
                res.status(200).json({ message: 'Customer updated', customer: updatedCustomer.value });
            });
    } catch (ex) {
        console.error(colors.red('Failed updating customer: ' + ex));
        res.status(400).json({ message: 'Failed to update customer' });
    }
});

// Delete a customer
router.delete('/admin/customer', restrict, async (req, res) => {
    const db = req.app.db;

    // check for existing customer
    const customer = await db.customers.findOne({ _id: common.getId(req.body.customerId) });
    if (!customer) {
        res.status(400).json({
            message: 'Failed to delete customer. Customer not found'
        });
        return;
    }
    // Update customer
    try {
        await db.customers.deleteOne({ _id: common.getId(req.body.customerId) });
        indexCustomers(req.app)
            .then(() => {
                res.status(200).json({ message: 'Customer deleted' });
            });
    } catch (ex) {
        console.error(colors.red('Failed deleting customer: ' + ex));
        res.status(400).json({ message: 'Failed to delete customer' });
    }
});

// Filtered customers list
router.get('/admin/customers/filter/:search', restrict, async (req, res, next) => {
    const db = req.app.db;
    const searchTerm = req.params.search;
    const customersIndex = req.app.customersIndex;

    const lunrIdArray = [];
    customersIndex.search(searchTerm).forEach((id) => {
        lunrIdArray.push(common.getId(id.ref));
    });

    // we search on the lunr indexes
    const customers = await db.customers.find({ _id: { $in: lunrIdArray }});

    // If API request, return json
    if(req.apiAuthenticated) {
        return res.status(200).json({
            customers
        });
    }

    return res.send({
        title: 'Customer results',
        customers: customers,
        admin: true,
        config: req.app.config,
        session: req.session,
        searchTerm: searchTerm,
        message: common.clearSessionValue(req.session, 'message'),
        messageType: common.clearSessionValue(req.session, 'messageType')
    })
});