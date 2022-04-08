const path = require('path');
const winston = require('winston');
const { logs } = require('../../configs/logger');

require('dotenv').config({ path: path.join(__dirname, '../../../.env') }); //get env file from server root dri

const logger = winston.createLogger({
  transports: [new winston.transports.Console()],
  format: winston.format.prettyPrint(),
  colorize: true,
  json: true,
});

/**
 * @param {import('express').ErrorRequestHandler} err
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 * @returns {import('express').Response}
 *
 * @description server global error handler
 */
module.exports = (err, req, res, next) => {
  if (req.originalUrl.startsWith('/api')) {
    //TODO: implement logger functionality

    logger.error('Server Error: ', err);
    /**handles api errors in development */
    if (process.env.NODE_ENV === 'development') {
      return res.status(err.statusCode).json({
        status: err.status,
        err,
        message: err.message,
        error: err.error,
        stack: err.stack,
      });
    }

    /**checks for bad csrf token */
    if (err.code == 'EBADCSRFTOKEN') {
      return HttpStatusCode.INVALID_REQUEST({
        response: res,
        message: err.message,
      });
    }

    /**handles api errors in production */
    if (process.env.NODE_ENV === 'production') {
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    }
  }

  /**handles web errors */
  if (process.env.NODE_ENV === 'development') {
    return res.render('error-dev.ejs', {
      title: err.statusCode,
      message: err.message,
      stack: err.stack,
      layout: '_layouts/error',
    });
  }
  if (process.env.NODE_ENV === 'production') {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.send(err);
    return res.render('error-prod.ejs', {
      title: err.statusCode,
      message: err.message,
      layout: '_layouts/error',
    });
  }
};
