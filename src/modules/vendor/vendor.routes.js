const express = require('express');
const productController = require('../product/product.controller');
const vendorController = require('./vendor.controller');

const vendorRoutes = express.Router();

vendorRoutes.get('/dashboard', vendorController.index);
vendorRoutes.get('/products', vendorController.product); //view products created by a vendor

// vendorRoutes.get('/products/create', productController.productCreateWeb);/**** both features implemented in product
// vendorRoutes.get('/transactions', vendorController.transaction);**/
vendorRoutes.get('/setting/personal-info', vendorController.personalInformation);
vendorRoutes.get('/setting/pay-out', vendorController.payout);
vendorRoutes.get('/setting/notification', vendorController.notification);
vendorRoutes.get('/setting/security', vendorController.security);

module.exports = vendorRoutes;
