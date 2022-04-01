const HttpStatus = require('../utils/http-status.util');

class UnauthorizedException extends Error {
    constructor({ message = 'Invalid or expired token', data = {}, errors = {} }) {
        super({ message, data, errors }, HttpStatus.UNAUTHORIZED);
    }
}

module.exports = UnauthorizedException;