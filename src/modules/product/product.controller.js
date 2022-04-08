const HttpStatusCode = require('../../shared/utils/response-formatter.util');
const userSchema = require('../user/schema/user.schema');
const schemaValidator = require('../../shared/utils/schema-validator.util');

class ProductController {

    async productWeb(request, response) {
        const locals = {
            title: 'register',
            scripts: [''],
        };
        return response.render('auth/register', {
            layout: '_layouts/vendor',
            locals,
            csrfToken: request.csrfToken(),
        });
    }
    async productListWeb(request, response) {
        const locals = {
            title: 'account registration',
            scripts: ['<script src="/app/auth/register.js"></script>'],
        };
        return response.render('auth/account-register', {
            layout: '_layouts/vendor',
            locals,
            csrfToken: request.csrfToken(),
        });
    }
    async createProductApi(request, response) {
        const { body } = request;
        try {
            const { errors, data } = schemaValidator(userSchema.createAccountSchema, {
                ...body,
            });
            if (errors) {
                return HttpStatusCode.INVALID_REQUEST({ response, errors });
            }

            //const { data: result, message } = await UserService.register(data);
            //await emailService.sendVericationMail(authData);
            return HttpStatusCode.CREATED({ response, message, data: result });
        } catch (error) {
            return HttpStatusCode.UNPROCCESSABLE_ENTITY({
                response,
                message: error.message,
            });
        }
    }
    async fetchProductApi(request, response) {
        const { body } = request;
        try {
            const { errors, data } = schemaValidator(userSchema.createAccountSchema, {
                ...body,
            });
            if (errors) {
                return HttpStatusCode.INVALID_REQUEST({ response, errors });
            }

            //const { data: result, message } = await UserService.register(data);
            //await emailService.sendVericationMail(authData);
            return HttpStatusCode.CREATED({ response, message, data: result });
        } catch (error) {
            return HttpStatusCode.UNPROCCESSABLE_ENTITY({
                response,
                message: error.message,
            });
        }
    }

}

module.exports = new ProductController();