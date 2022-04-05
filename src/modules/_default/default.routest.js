var express = require('express');

const defaultController = require('./default.controller');
const accountController = require('../account/account.controller');
const defaultRoutes = express.Router();

defaultRoutes.get('/', defaultController.homeController);
defaultRoutes.get('/about-us', defaultController.aboutController);
defaultRoutes.get('/terms-conditions', defaultController.contactController);
defaultRoutes.get('/privacy-policy', defaultController.privacyController);
defaultRoutes.get('/affiliate', defaultController.affiliateController);
defaultRoutes.get('/vendor', defaultController.vendoreController);
defaultRoutes.get('/register', accountController.registerWeb);
defaultRoutes.get('/login', accountController.loginWeb);
defaultRoutes.get('/account/register', accountController.registerAccountWeb);
defaultRoutes.get('/account/verification', accountController.verifyAccountWeb);


module.exports = defaultRoutes;