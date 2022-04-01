const HttpStatus = require('../utils/http-status.util');

class UnknownException extends Error {
    constructor({ message = 'Unable to process your request, please try again', data = {}, errors = {} }) {
        super({ message, data, errors }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
module.exports = UnknownException;