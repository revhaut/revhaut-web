var express = require('express');

const defaultController = require('./default.controller');
const userController = require('../user/user.controller');
const defaultRoutes = express.Router();

defaultRoutes.get('/', defaultController.homeController);
defaultRoutes.get('/about-us', defaultController.aboutController);
defaultRoutes.get('/terms-conditions', defaultController.contactController);
defaultRoutes.get('/privacy-policy', defaultController.privacyController);
defaultRoutes.get('/affiliate', defaultController.affiliateController);
defaultRoutes.get('/vendor', defaultController.vendoreController);
defaultRoutes.get('/register', userController.registerWeb);
defaultRoutes.get('/account/register', userController.registerAccountWeb);

module.exports = defaultRoutes;