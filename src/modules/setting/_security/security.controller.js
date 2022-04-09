class SecurityController {
    async changePasswordWeb(request, response) {
        const locals = {
            title: 'account verification',
            scripts: ['<script src="/app/auth/verification.js"></script>'],
            csrfToken: request.csrfToken(),
        };
        return response.render('settings/personal-info', {
            layout: '_layouts/authenticate',
            locals,
            csrfToken: request.csrfToken(),
        });
    }
    async postChangePasswordApi(request, response) {
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
}

module.exports = new SecurityController();