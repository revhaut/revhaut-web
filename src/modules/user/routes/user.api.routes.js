const express = require('express');
const userController = require('../user.controller');

const userRoutes = express.Router();

// userRoutes.get('/dashboard', userController.dashboard);
// userRoutes.post('/login', userController.postLoginApi);
// userRoutes.post('/verify', userController.postVerifyTokeApi);
// userRoutes.post('/logout', userController.postLogoutApi);

module.exports = userRoutes;