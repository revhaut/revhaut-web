const express = require('express');
const countryController = require('../country.controller');

const countryRoutes = express.Router();

countryRoutes.get('/', countryController.getCountryApi);
countryRoutes.post('/state', countryController.getCountryStateApi);


module.exports = countryRoutes;