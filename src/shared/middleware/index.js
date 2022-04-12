const express = require('express');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const webRoute = require('../routes/web.routes');
const apiRoute = require('../routes/api.routes');
const expressLayouts = require('express-ejs-layouts');
const csrf = require('csurf');
const os = require('os');
const path = require('path');
const formData = require('express-form-data');
const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session);
const db = require('../../database');
const store = new KnexSessionStore({
    Knex: db,
    tablename: 'sessions',
});
const middlewareConfig = require('../../configs/middleware.config');

const middleWare = app => {
    app.use(expressLayouts);
    app.use('/', express.static(path.join(__dirname, '../../public')));
    app.set('views', path.join(__dirname, '../../views'));
    app.set('view engine', 'ejs');
    app.use(logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(formData.parse({ uploadDir: os.tmpdir(), autoClean: true }));
    app.use(helmet());
    app.use(cookieParser());
    app.use(csrf({ cookie: true }));
    apiRoute(app);
    webRoute(app);

    // catch 404 and forward to error handler
};

module.exports = middleWare;