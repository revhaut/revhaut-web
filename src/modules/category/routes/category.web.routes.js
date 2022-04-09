const express = require('express');
const categoryController = require('../category.controller');

const categoryRoutes = express.Router();

categoryRoutes.get('/create', categoryController.createCategoryWeb);
// userRoutes.post('/login', userController.postLoginApi);
// userRoutes.post('/verify', userController.postVerifyTokeApi);
// userRoutes.post('/logout', userController.postLogoutApi);
module.exports = categoryRoutes;