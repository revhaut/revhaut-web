const HttpStatusCode = require('../../shared/utils/response-formatter.util');
const userSchema = require('../user/schema/user.schema');
const schemaValidator = require('../../shared/utils/schema-validator.util');
const UserService = require('./user.service');
class UserController {
    async dashboard(request, response) {
        response.render('users/dashboard', { layout: '_layouts/default' });
    }

   
    async postLoginApi(request, response) {
        const { body } = request;
        try {
            const { errors, data } = schemaValidator(accountSchema.createAccountSchema, {
                ...body,
            });
            if (errors) {
                return HttpStatusCode.INVALID_REQUEST({ res, errors });
            }

            const { data: result, message } = await UserService.register(data);
            //await emailService.sendVericationMail(authData);
            return HttpStatusCode.CREATED({ response, message, data: result });
        } catch (error) {
            return HttpStatusCode.UNPROCCESSABLE_ENTITY({
                response,
                message: error.message,
            });
        }
    }
    async postLogoutApi(request, response) {}
    async postResetApi(request, response) {}
    async postVerifyTokeApi(request, response) {}
    async send_token(request, response) {}
    async loginSetUp({ response, user }) {}
}

module.exports = new UserController();