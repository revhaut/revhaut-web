const HttpStatus = require('../utils/http-status.util');

class ForbiddenException extends Error {
    constructor({ message = 'Invalid or expired token', data = {}, errors = {} }) {
        super({ message, data, errors }, HttpStatus.FORBIDDEN);
    }
}

module.exports = ForbiddenException;