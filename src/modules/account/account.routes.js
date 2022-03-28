const express = require('express');
const accountController = require('./account.controller');

const accountRoutes = express.Router();

accountRoutes.post('/register', accountController.createUserAccount);
accountRoutes.get('/verify', accountController.verifyUserAccount);
accountRoutes.get('/users', accountController.fetchUserAccounts);

module.exports = accountRoutes;