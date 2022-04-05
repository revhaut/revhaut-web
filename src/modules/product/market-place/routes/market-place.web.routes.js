const express = require( 'express');
const marketPlaceController = require('../market-place.controller');
const marketPlaceRoute = express.Router();

marketPlaceRoute.get('/', marketPlaceController.MarktetPlaceWeb);
marketPlaceRoute.get('/list', marketPlaceController.MarktetPlaceListWeb);

module.exports=marketPlaceRoute;