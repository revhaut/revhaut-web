const express = require('express');
const accountController = require('../account.controller');

const accountRoutes = express.Router();

accountRoutes.post('/register', accountController.postRegisterApi);
accountRoutes.post('/verification', accountController.verifyAccountApi);


module.exports = accountRoutes;