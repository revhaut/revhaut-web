const HttpStatusCode = require('../../shared/utils/response-formatter.util');
const schemaValidator = require('../../shared/utils/schema-validator.util');
const accountSchema = require('./schema/account.schema');
const passwordUtil = require('../../shared/utils/generate-password');
const accountService = require('../account/account.service');
const countryService = require('../country/country.service');
class AccountController {
    async resetPasswordWeb(request, response) {
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
            return HttpStatusCode.CREATED({ response, message, data: result });
        } catch (error) {
            return HttpStatusCode.UNPROCCESSABLE_ENTITY({
                response,
                message: error.message,
            });
        }
    }
    async verifyAccountWeb(request, response) {
        const locals = {
            title: 'account verification',
            scripts: ['<script src="/app/auth/verification.js"></script>'],
            csrfToken: request.csrfToken(),
        };
        return response.render('account/verification', {
            layout: '_layouts/default',
            locals,
            csrfToken: request.csrfToken(),
        });
    }

    async registerWeb(request, response) {
        const locals = {
            title: 'vendor & affiliate registration',
        };
        return response.render('account/register', {
            layout: '_layouts/default',
            locals,
            csrfToken: request.csrfToken(),
        });
    }
    async registerAccountWeb(request, response) {
        const locals = {
            title: 'account registration',
            countries: await countryService.getCountries(),
            scripts: ['<script src="/app/auth/register.js"></script>'],
        };
        return response.render('account/account-register', {
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
        return response.render('account/login', {
            layout: '_layouts/auth',
            locals,
            csrfToken: request.csrfToken(),
        });
    }

    async verifyAccountApi(request, response) {
        try {
            const { body } = request;
            console.log(body);
            const { errors, data: token } = schemaValidator(accountSchema.verification, body);
            if (errors) {
                return HttpStatusCode.INVALID_REQUEST({ res, errors });
            }
            const { authData } = await accountService.verifyToken(token);
            res.send(authData);
        } catch (error) {
            return HttpStatusCode.UNPROCCESSABLE_ENTITY({
                response,
                message: error.message,
            });
        }
    }
    async resetPasswordApi(request, response) {
        try {
            const { query } = request;
            const { errors, data } = schemaValidator(accountSchema.accountVerification, query);
            if (errors) {
                return HttpStatusCode.INVALID_REQUEST({ res, errors });
            }
            const { authData } = await accountService.verifyUserAccount(data);
            res.send(authData);
        } catch (error) {
            return HttpStatusCode.UNPROCCESSABLE_ENTITY({
                response,
                message: error.message,
            });
        }
    }
    async loginApi(request, response) {
        try {
            const { query } = request;
            const { errors, data } = schemaValidator(accountSchema.accountVerification, query);
            if (errors) {
                return HttpStatusCode.INVALID_REQUEST({ res, errors });
            }
            const { authData } = await accountService.verifyUserAccount(data);
            res.send(authData);
        } catch (error) {
            return HttpStatusCode.UNPROCCESSABLE_ENTITY({
                response,
                message: error.message,
            });
        }
    }
    async postRegisterApi(request, response) {
        const { body } = request;
        try {
            const { errors, data } = schemaValidator(accountSchema.createAccountSchema, {
                ...body,
            });
            if (errors) {
                return HttpStatusCode.INVALID_REQUEST({ response, errors });
            }
            const { is_success, data: result, message } = await AccountService.createAccount(data);
            if (!is_success) {
                return HttpStatusCode.INVALID_REQUEST({
                    response,
                    message: error.message,
                });
            }
            return HttpStatusCode.CREATED({ response, message, data: { redirectUrl: '/account/verification' } });
        } catch (error) {
            return HttpStatusCode.UNPROCCESSABLE_ENTITY({
                response,
                message: error.message,
            });
        }
    }
}

module.exports = new AccountController();