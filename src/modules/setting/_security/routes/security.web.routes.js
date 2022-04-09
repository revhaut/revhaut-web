const express = require('express');
const secuirtyController = require('../security.controller');

const secuirtyRoutes = express.Router();

secuirtyRoutes.get('/', secuirtyController.changePasswordWeb);

module.exports = secuirtyRoutes;