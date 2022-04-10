const HttpStatusCode = require('./http-status.util');

function formatResponse(params) {
    const { data, errors = false, message } = params;
    return {
        data,
        errors,
        message,
    };
}

class ResponsFormatter {
    static SUCCESS(params) {
        const { message = 'Request Successful', data = {}, errors, response } = params;
        const responseDetails = formatResponse({ data, message, errors });
        return response.status(HttpStatusCode.OK().value).send(responseDetails);
    }

    static CREATED(params) {
        const { message = 'Request Successful', data = {}, response } = params;
        const responseDetails = formatResponse({ message, data });
        return response.status(HttpStatusCode.CREATED().value).send(responseDetails);
    }

    static INVALID_REQUEST(params) {
        const { message = 'Request failed', errors = true, response } = params;
        const responseDetails = formatResponse({ errors, message });
        return response.status(HttpStatusCode.INVALID_REQUEST().value).send(responseDetails);
    }

    static UNPROCCESSABLE_ENTITY(params) {
        const { message = 'Request failed', errors = true, response } = params;
        const responseDetails = formatResponse({ errors: true, message });
        return response.status(HttpStatusCode.UNPROCESSABLE_ENTITY().value).send(responseDetails);
    }

    static UNAUTHORIZED(params) {
        const { message = 'UNAUTHORIZED', errors = true, response } = params;
        const responseDetails = formatResponse({ errors: true, message });
        return response.status(HttpStatusCode.UNAUTHORIZED().value).send(responseDetails);
    }

    static FORBIDDEN(params) {
        const { message = 'FORBIDDEN', errors = true, response } = params;
        const responseDetails = formatResponse({ errors: true, message });
        return response.status(HttpStatusCode.FORBIDDEN().value).send(responseDetails);
    }
}

module.exports = ResponsFormatter;