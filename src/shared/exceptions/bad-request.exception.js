const HttpStatusCode = require('../utils/http-status.util');

class BadRequestException extends Error {
    constructor({ message = 'Invalid request', data = {}, errors = {} }) {
        super({ message, data, errors }, HttpStatusCode.INVALID_REQUEST);
    }
}

module.exports = BadRequestException;