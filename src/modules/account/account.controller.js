const HttpStatusCode = require('../../shared/utils/response-formatter.util');
const schemaValidator = require('../../shared/utils/schema-validator.util');
const accountSchema = require('./schema/account.schema');
const passwordUtil = require('../../shared/utils/generate-password');
const accountService = require('../account/account.service');
const countryService = require('../country/country.service');
const Encryption = require('../../shared/utils/encryption');
const appConfig = require('../../configs/app.config');
const { cookieOption, getCookiesExpires } = require('../../configs/middleware.config');
class AccountController {
    constructor() {}
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
            scripts: ['<script src="/app/auth/login.js"></script>'],
        };
        return response.render('account/login', {
            layout: '_layouts/auth',
            locals,
            csrfToken: request.csrfToken(),
        });
    }
    async postVerifyAccountApi(request, response) {
        try {
            const { body } = request;
            const { errors, data: token } = schemaValidator(accountSchema.verification, body);
            if (errors) {
                return HttpStatusCode.INVALID_REQUEST({ res, errors });
            }
            const { is_success, message } = await accountService.verifyToken(token);
            if (is_success) {
                return HttpStatusCode.SUCCESS({
                    response,
                    message: message,
                    errors: true,
                });
            }
            return HttpStatusCode.SUCCESS({
                response,
                message: message,
                data: { url: '/login' },
            });
        } catch (error) {
            return HttpStatusCode.SUCCESS({
                response,
                errors: true,
                message: error.message,
            });
        }
    }
    async postResetPasswordApi(request, response) {
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
                errors: true,
                message: error.message,
            });
        }
    }
    async postLoginApi(request, response) {
        try {
            const { body } = request;
            const { errors, data: loginData } = schemaValidator(accountSchema.loginSchema, body);
            if (errors) {
                return HttpStatusCode.INVALID_REQUEST({ response, errors });
            }
            const { is_success, data, message } = await accountService.userLogin(loginData);
            if (!is_success) {
                return HttpStatusCode.SUCCESS({
                    response,
                    message,
                    errors: true,
                    data,
                });
            }

            const { id, first_name, last_name, user_type, email } = data;
            //Generate auth token and save to cookie
            const authToken = Encryption.encrypt(JSON.stringify({ id, first_name, last_name, email, user_type }));
            response.cookie(appConfig.authName, authToken, {
                ...cookieOption.parseOptions,
                expires: getCookiesExpires(),
            });
            return response;
        } catch (error) {
            return HttpStatusCode.SUCCESS({
                response,
                errors: true,
                message: error.message,
            });
        }
    }
    async postRegisterApi(request, response) {
        const { body } = request;
        try {
            const { errors, data: userData } = schemaValidator(accountSchema.createAccountSchema, {
                ...body,
            });
            if (errors) {
                return HttpStatusCode.INVALID_REQUEST({ response, errors });
            }
            const { is_success, data, message, destination } = await accountService.createAccount(userData);
            if (!is_success) {
                return HttpStatusCode.SUCCESS({
                    response,
                    message,
                    errors: true,
                    data: { data, url: destination },
                });
            }
            return HttpStatusCode.CREATED({ response, message, data: { data, url: '/account/verification' } });
        } catch (error) {
            return HttpStatusCode.UNPROCCESSABLE_ENTITY({
                response,
                errors: true,
                message: error.message,
            });
        }
    }
    async postGenerateVerificationTokenApi(request, response) {
        const { body } = request;
        try {
            const { errors, data } = schemaValidator(accountSchema.generateToken, {
                ...body,
            });
            if (errors) {
                return HttpStatusCode.INVALID_REQUEST({ response, errors });
            }
            const { is_success, data: result, message } = await accountService.createAccount(data);
            if (!is_success) {
                return HttpStatusCode.INVALID_REQUEST({
                    response,
                    message,
                    errors: true,
                });
            }
            return HttpStatusCode.SUCCESS({ response, message, data: { url: '/account/verification' } });
        } catch (error) {
            return HttpStatusCode.UNPROCCESSABLE_ENTITY({
                response,
                errors: true,
                message: error.message,
            });
        }
    }
    async logOutUser() {
        const parseOptions = {
            ...cookieOption.parseOptions,
            expires: getCookiesExpires(),
        };
        await this.userService.clearCache(currentUser);
        response.clearCookie(appConfig.authName, parseOptions);

        return {};
    }
}

module.exports = new AccountController();