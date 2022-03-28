const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const webRoute = require('../routes/web.routes');
const expressLayouts = require('express-ejs-layouts');
const middleWare = (app) => {
    app.use(expressLayouts);
    app.use('/', express.static(path.join(__dirname, '../../public')));
    app.set('views', path.join(__dirname, '../../views'));
    app.set('view engine', 'ejs');
    app.use(logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, 'public')));
    webRoute(app);

    // catch 404 and forward to error handler
};

module.exports = middleWare;