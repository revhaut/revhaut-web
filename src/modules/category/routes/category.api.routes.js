const express = require('express');
const categoryController = require('../category.controller');

const categoryRoutes = express.Router();

categoryRoutes.get('/', categoryController.fetchAllCategoryApi);
categoryRoutes.get('/:id', categoryController.fetchCategoryApi);
// userRoutes.post('/verify', userController.postVerifyTokeApi);
// userRoutes.post('/logout', userController.postLogoutApi);
module.exports = categoryRoutes;