const fs = require('fs');
const yenv = require('yenv');
if (fs.existsSync('./env.yaml')) {
    process.env = yenv('env.yaml', { strict: false });
}
const path = require('path');
const express = require('express');
const historyApiFallback = require('connect-history-api-fallback');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const moment = require('moment');
const _ = require('lodash');
const MongoStore = require('connect-mongodb-session')(session);
const numeral = require('numeral');
const helmet = require('helmet');
const colors = require('colors');
const cron = require('node-cron');
const crypto = require('crypto');
const common = require('./lib/common');

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('./webpack.config');

const { initDb, getDbUri } = require('./lib/db');
const { addSchemas } = require('./lib/schema');
const { runIndexing } = require('./lib/indexing');

let handlebars = require('express-handlebars');
const i18n = require('i18n');

// Validate a settings schema
const Ajv = require('ajv');
const ajv = new Ajv({ useDefaults: true });

// get config
const config = common.getConfig();

// require the routes
const admin = require('./routes/admin');
const customer = require('./routes/customer');
const product = require('./routes/product');
const indexRoute = require('./routes/index'); 
const sessionRoute = require('./routes/session'); 

// require routes
const app = express();

// session store
const store = new MongoStore({
    uri: getDbUri(config.databaseConnectionString),
    collection: 'sessions'
});

// Setups secret
if (!config.secretCookie || config.secretCookie === '') {
    const randomString = crypto.randomBytes(20).toString('hex');
    config.secretCookie = randomString;
    common.updateConfigLocal({ secretCookie: randomString });
}
if (!config.secretSession || config.secretSession === '') {
    const randomString = crypto.randomBytes(20).toString('hex');
    config.secretSession = randomString;
    common.updateConfigLocal({ secretSession: randomString });
}

app.enable('trust proxy');
app.use(helmet());
app.set('port', process.env.PORT || 3001);
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser(config.secretCookie));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: config.secretSession,
    cookie: {
        path: '/',
        httpOnly: true,
        maxAge: 900000
    },
    store: store
}));


app.use(bodyParser.json());

// serving static content
app.use(express.static(path.join(__dirname, 'public')));

// setup the routes
app.use('/', admin);
app.use('/', customer);
app.use('/', product);
app.use('/', sessionRoute);
app.use('/', indexRoute);

// catch 404 and forward to error handler
// app.use((req, res, next) => {
//     const err = new Error('Not Found');
//     err.status = 404;
//     next(err);
// });

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    const compiler = webpack(webpackConfig);

    app.use(historyApiFallback({
        verbose: false
    }));

    app.use(webpackDevMiddleware(compiler, {
        publicPath: webpackConfig.output.publicPath,
        contentBase: path.resolve(__dirname, '../client/public'),
        stats: {
            colors: true,
            hash: false,
            timings: true,
            chunks: false,
            chunkModules: false,
            modules: false
        }
    }));

    app.use(webpackHotMiddleware(compiler));
    app.use(express.static(path.resolve(__dirname, '../dist')));

    // development error handler
    // will print stacktrace
    app.use((err, req, res, next) => {
        console.error(colors.red(err.stack));
        res.status(err.status || 500);
        // res.render('error', {
        //     message: err.message,
        //     error: err,
        //     helpers: handlebars.helpers
        // });
    });
} else {
    app.use(express.static(path.resolve(__dirname, '../dist')));
    app.get('*', function (req, res) {
        res.sendFile(path.resolve(__dirname, '../dist/index.html'));
        res.end();
    });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
    console.error(colors.red(err.stack));
    res.status(err.status || 500);
    // res.render('error', {
    //     message: err.message,
    //     error: {},
    //     helpers: handlebars.helpers
    // });
});

app.on('uncaughtException', (err) => {
    console.error(colors.red(err.stack));
    process.exit(2);
});

initDb(config.databaseConnectionString, async (err, db) => {
    // On connection error we display then exit
    if (err) {
        console.log(colors.red('Error connecting to MongoDB: ' + err));
        process.exit(2);
    }

    // add db to app for routes
    app.db = db;
    app.config = config;
    app.port = app.get('port');


    // Fire up the cron job to clear temp held stock
    cron.schedule('*/1 * * * *', async () => {
        const validSessions = await db.sessions.find({}).toArray();
        const validSessionIds = [];
        _.forEach(validSessions, (value) => {
            validSessionIds.push(value._id);
        });

        // Remove any invalid cart holds
        await db.cart.deleteMany({
            sessionId: { $nin: validSessionIds }
        });
    });

    // Set trackStock for testing
    if (process.env.NODE_ENV === 'test') {
        config.trackStock = true;
    }

    // Process schemas
    await addSchemas();

    // We index when not in test env
    if (process.env.NODE_ENV !== 'test') {
        try {
            await runIndexing(app);
        } catch (ex) {
            console.error(colors.red('Error setting up indexes:' + err));
        }
    }

    // Start the app
    try {
        await app.listen(app.get('port'));
        app.emit('appStarted');
        if (process.env.NODE_ENV !== 'test') {
            console.log(colors.green('MyCart running on host: http://localhost:' + app.get('port')));
        }
    } catch (ex) {
        console.error(colors.red('Error starting MyCart app:' + err));
        process.exit(2);
    }
});