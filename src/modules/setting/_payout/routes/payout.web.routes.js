const express = require('express');
const payoutController = require('../payout.controller');

const secuirtyRoutes = express.Router();

secuirtyRoutes.get('/', payoutController.createPayOutWeb);

module.exports = secuirtyRoutes;