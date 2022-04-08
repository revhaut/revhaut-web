const HttpStatusCode = require('../../shared/utils/response-formatter.util');
const userSchema = require('../user/schema/user.schema');
const schemaValidator = require('../../shared/utils/schema-validator.util');
const UserService = require('./user.service');

class CategoryController {
    async createCategoryWeb(request, response) {
        response.render('users/dashboard', { layout: '_layouts/default' });
    }
    async listCategoryWeb(request, response) {
        response.render('users/dashboard', { layout: '_layouts/default' });
    }

    async postCreateCategoryApi(request, response) {
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
    async fetchCategoryApi(request, response) {}
    async fetchAllCategoryApi(request, response) {}
}

module.exports = new CategoryController();