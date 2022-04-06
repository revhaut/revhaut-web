const express = require('express');
const productController = require('../product.controller');
const marketPlaceRoute = require('../market-place/routes/market-place.web.routes');
const productRoutes = express.Router();

productRoutes.route('/create').get(productController.productCreateWeb).post(productController.productCreateWebPost);
productRoutes.get('/list', productController.productListWeb);
productRoutes.use('/', marketPlaceRoute);
module.exports = productRoutes;
