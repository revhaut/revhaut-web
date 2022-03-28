const express = require('express');
const userController = require('./user.controller');

const userRoutes = express.Router();

userRoutes.get('/dashboard', userController.dashboard);

module.exports = userRoutes;