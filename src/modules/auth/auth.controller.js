//const schemaValidator = require('../../../src/shared/utils/schema.validator');

//const authSchema = reuire('./schema/auth.schema');
//const httpRespone = require('../../../src/shared/utils/response.formater');
//const authService = require('./services');

// const userLogin = async(reques, response) => {
//     try {
//         const { errors, data } = schemaValidator(authSchema.loginSchema, req.body);
//         if (errors) {
//             return httpRespone.INVALID_REQUEST({ res, errors });
//         }
//         const { authData, message } = await authService.signInService(data);
//         if (authData.authToken) {
//             res.cookie(process.env.AUTH_NAME, authData.authToken, { path: '/' });
//             delete authData.authToken;
//         }
//         return httpRespone.SUCCESS({ res, message, data: { authData } });
//     } catch (error) {
//         return httpRespone.UNPROCCESSABLE_ENTITY({ res, message: error.message });
//     }
// };

const loginWeb = async(reques, response) => {
    let locals = {
        title: 'Page Title',
        description: 'Page Description',
        active: 'active',
        scripts: ['<script src="/assets/app/login.js"></script>'],
    };
    response.render('auth/login', { layout: '_layouts/default', locals });
};

const registerWeb = async(request, response) => {
    const locals = {
        title: 'register',
        scripts: ['<script src="/assets/app/register.js"></script>'],
    };
    response.render('auth/register', { layout: '_layouts/default', locals });
};
const vendorRegisterWeb = async(request, response) => {
    const locals = {
        title: 'Vendor registration',
        scripts: ['<script src="/assets/app/register.js"></script>'],
    };
    response.render('auth/vendor', { layout: '_layouts/auth', locals });
};
const affiliateRegisterWeb = async(reequest, response) => {
    const locals = {
        title: 'Affiliate registration',
        scripts: ['<script src="/assets/app/register.js"></script>'],
    };
    response.render('auth/affiliate', { layout: '_layouts/auth', locals });
};
const resetPasswordController = async(reqequest, response) => {
    response.render('auth/forget-password');
};

module.exports = {
    loginWeb,
    resetPasswordController,
    registerWeb,
    vendorRegisterWeb,
    affiliateRegisterWeb,
};