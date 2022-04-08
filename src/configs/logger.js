const winston = require('winston');
const path = require('path');

const logPath = path.join(__dirname, '../logs/app.log');
const errorPath = path.join(__dirname, '../logs/error.log');

const infoOptions = {
  level: 'info',
  filename: logPath,
  handleExceptions: true,
  json: true,
  maxsize: 5242880, // 5MB
  maxFiles: 5,
  colorize: false,
};

const errorOptions = {
  level: 'error',
  filename: errorPath,
  handleExceptions: true,
  json: true,
  maxsize: 5242880, // 5MB
  maxFiles: 5,

  colorize: false,
};

const consoleOptions = {
  console: {
    level: 'error',
    handleExceptions: true,
    json: false,
    colorize: true,
  },
};

const logger = new winston.createLogger({
  transports: [
    new winston.transports.File({ ...infoOptions }),
    new winston.transports.File({ ...errorOptions }),
    new winston.transports.Console({
      ...consoleOptions,
      format: winston.format.prettyPrint(),
    }),
  ],
  exitOnError: false, // do not exit on handled exceptions
});

logger.stream = {
  write(message, encoding) {
    logger.info(message);
  },
};

const customLogger = winston.createLogger({
  transports: [new winston.transports.Console(), new winston.transports.File({ ...errorOptions }), new winston.transports.File({ ...infoOptions })],
  format: winston.format.prettyPrint(),
  colorize: true,
  json: true,
});

module.exports = { appLogger: logger, logs: customLogger };
