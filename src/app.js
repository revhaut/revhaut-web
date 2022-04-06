require('dotenv').config();
const createError = require('http-errors');
const middlewares = require('./shared/middleware');
const HttpStatusCode = require('./shared/utils/response-formatter.util');
const App = app => {
  middlewares(app);
  app.use(function (req, res, next) {
    next(createError(404));
  });
  app.use(function (err, req, res, next) {
    if (err.code == 'EBADCSRFTOKEN') {
      return HttpStatusCode.INVALID_REQUEST({
        response: res,
        message: err.message,
      });
    }
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.send(err);
    // res.render('error');
  });
};

module.exports = App;
