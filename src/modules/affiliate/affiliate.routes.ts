import express from 'express';
import affiliateController from './affiliate.controller';

const affiliateRoutes = express.Router();

affiliateRoutes.get('/dashboard', affiliateController.index);
affiliateRoutes.get('/market-places', affiliateController.marketPlace);
affiliateRoutes.get('/affiliate-sales', affiliateController.sales);
affiliateRoutes.get('/transactions', affiliateController.transaction);
affiliateRoutes.get('/refferrals', affiliateController.refferals);
affiliateRoutes.get('/setting/personal-info', affiliateController.personalInformation);
affiliateRoutes.get('/setting/pay-out', affiliateController.payout);
affiliateRoutes.get('/setting/notification', affiliateController.notification);
affiliateRoutes.get('/setting/security', affiliateController.security);

export default affiliateRoutes;
