const express = require('express');
const accountController = require('./account.controller');

const accountRoutes = express.Router();

accountRoutes.post('/register', accountController.createUserAccount);
accountRoutes.post('/verify', accountController.verifyUserAccount);

module.exports = accountRoutes;