import express from 'express';
import vendorController from './vendor.controller';

const vendorRoutes = express.Router();

vendorRoutes.get('/dashboard', vendorController.index);
vendorRoutes.get('/products', vendorController.product);
vendorRoutes.get('/products/create', vendorController.createProduct);
vendorRoutes.get('/transactions', vendorController.transaction);
vendorRoutes.get('/setting/personal-info', vendorController.personalInformation);
vendorRoutes.get('/setting/pay-out', vendorController.payout);
vendorRoutes.get('/setting/notification', vendorController.notification);
vendorRoutes.get('/setting/security', vendorController.security);

export default vendorRoutes;
