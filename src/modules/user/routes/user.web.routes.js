const express = require( 'express');
const userController = require('../user.controller');

const userRoutes = express.Router();

userRoutes.get('/setup', userController.registerWeb);
userRoutes.get('/register', userController.registerAccountWeb);
userRoutes.get('/login', userController.loginWeb);


module.exports=userRoutes;