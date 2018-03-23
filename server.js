'use strict';
let express = require('express'),
    routes = require('./routes/routes'),
    PORT = require('./config/mainconfig').PORT,
    dbConnectUrl = require('./config/mainconfig').dbPORT;

let passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    bodyParser = require('body-parser');

let app = express();
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());

let redis = require("redis"),
    RedisStore = require('connect-redis')(session);
    app.use(cookieParser());
    app.use(session({
        secret: 'SUPerseCRET',
        store:new RedisStore
    }));
    app.use(passport.initialize());
    app.use(passport.session());

let mongoose = require('mongoose');
    mongoose.connect('mongodb://' + dbConnectUrl, { useMongoClient: true });

let db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', () => {
        mongoose.Promise = global.Promise;
        console.log(' db connected\n');
    });
    
let logs = require('./middleware/logs').reqInfo;
app.use((req, res, next) => {
    logs(req);
    next();
});
app.use('/api',routes);
app.listen(PORT, () => {
    console.log(' app listening on ' + PORT);
});

