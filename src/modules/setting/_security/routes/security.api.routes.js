const express = require('express');
const secuirtyController = require('../security.controller');

const secuirtyRoutes = express.Router();

secuirtyRoutes.post('/change-password', secuirtyController.postChangePasswordApi);

module.exports = secuirtyRoutes;