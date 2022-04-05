const HttpStatus = require('../utils/http-status.util');
class NotFoundException extends Error {
    constructor({ message = 'Resource with given detail not found', data = {}, errors = {} }) {
        super({ message, data, errors }, HttpStatus.NOT_FOUND);
    }
}

module.exports = NotFoundException;