import express from 'express';
import defaultController from '../../../src/modules/_default/default.controller';
import authController from '../auth/auth.controller';
const defaultRoutes = express.Router();

defaultRoutes.get('/', defaultController.homeController);
defaultRoutes.get('/contact', defaultController.contactController);
defaultRoutes.get('/about-us', defaultController.aboutController);
defaultRoutes.get('/terms-conditions', defaultController.contactController);
defaultRoutes.get('/privacy-policy', defaultController.privacyController);
defaultRoutes.get('/affiliate', defaultController.affiliateController);
defaultRoutes.get('/vendor', defaultController.vendoreController);
defaultRoutes.get('/register', authController.registerWeb);
defaultRoutes.get('/register/vendor', authController.vendorRegisterWeb);
defaultRoutes.get('/register/affiliate', authController.affiliateRegisterWeb);

export default defaultRoutes;
