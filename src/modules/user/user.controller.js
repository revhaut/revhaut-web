const HttpStatusCode = require('../../shared/utils/response-formatter.util');
const userSchema = require('../user/schema/user.schema');
const schemaValidator = require('../../shared/utils/schema-validator.util');
const UserService = require('./user.service');
class UserController {
    async dashboard(request, response) {
        response.render('users/dashboard', { layout: '_layouts/default' });
    }
    async registerWeb(request, response) {
        const locals = {
            title: 'register',
            scripts: ['<script src="/vendors/editor/farmingDetails.js"></script>'],
        };
        return response.render('auth/register', {
            layout: '_layouts/default',
            locals,
            csrfToken: request.csrfToken(),
        });
    }
    async registerAccountWeb(request, response) {
        const locals = {
            title: 'account registration',
            scripts: ['<script src="/app/auth/register.js"></script>'],
        };
        return response.render('auth/account-register', {
            layout: '_layouts/auth',
            locals,
            csrfToken: request.csrfToken(),
        });
    }
    async loginWeb(request, response) {
        const locals = {
            title: 'login',
            scripts: ['<script src="/vendors/editor/farmingDetails.js"></script>'],
        };
        return response.render('auth/login', {
            layout: '_layouts/auth',
            locals,
        });
    }
    async postRegisterApi(request, response) {
        const { body } = request;
        try {
            const { errors, data } = schemaValidator(userSchema.createAccountSchema, {
                ...body,
            });
            if (errors) {
                return HttpStatusCode.INVALID_REQUEST({ response, errors });
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
    async postLoginApi(request, response) {
        const { body } = request;
        try {
            const { errors, data } = schemaValidator(accountSchema.createAccountSchema, {
                ...body,
            });
            if (errors) {
                return HttpStatusCode.INVALID_REQUEST({ res, errors });
            }
            data.password = passwordUtil.hashPassword(data.password);
            const { data: result, message } = await AccountService.create(data);
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