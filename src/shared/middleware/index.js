const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const webRoute = require('../routes/web.routes');
const apiRoute = require('../routes/api.routes');
const expressLayouts = require('express-ejs-layouts');
const csrf = require('csurf');
const middleWare = app => {
<<<<<<< HEAD
    app.use(expressLayouts);
    app.use('/', express.static(path.join(__dirname, '../../public')));
    app.set('views', path.join(__dirname, '../../views'));
    app.set('view engine', 'ejs');
    app.use(logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(csrf({ cookie: true }))
    apiRoute(app);
    webRoute(app);



  // catch 404 and forward to error handler
};

module.exports = middleWare;
