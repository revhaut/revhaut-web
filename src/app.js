require('dotenv').config();
const createError = require('http-errors');
const ErrorHandler = require('./shared/utils/errorHandler');
const middlewares = require('./shared/middleware');
const HttpStatusCode = require('./shared/utils/response-formatter.util');

//
const App = app => {
  middlewares(app);
  app.use(function (req, res, next) {
    next(createError(404));
  });

  app.use(ErrorHandler);
};

module.exports = App;
