const HttpStatusCode = require('../../shared/utils/response-formatter.util');
const schemaValidator = require('../../shared/utils/schema-validator.util');
const accountSchema = require('./schema/account.schema');
const accountService = require('./services');
const passwordUtil = require('../../shared/utils/generate-password');
const AccountService = require('../account/account.service');
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
    async verifyAccountWeb(request, response) {}
    async becomeVendorOrAffiliateWeb(request, response) {}
    async registerWeb(request, response) {}
    async LoginWeb(request, response) {}
    async LogOut(request, response) {}

    // ########==API-ROUTE==########
    async verifyAccountApi(request, response) {
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
    async RegisterApi(request, response) {
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
    async verifyAccountApi(request, response) {
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
}

module.exports = new AccountController();