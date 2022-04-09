const express = require('express');
const accountController = require('../account.controller');

const accountRoutes = express.Router();

accountRoutes.post('/register', accountController.postRegisterApi);
accountRoutes.post('/verification', accountController.postVerifyAccountApi);
accountRoutes.post('/login', accountController.postLoginApi);
accountRoutes.post('/reset-password', accountController.postResetPasswordApi);

module.exports = accountRoutes;