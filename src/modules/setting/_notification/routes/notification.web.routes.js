const express = require('express');
const notificationController = require('../notification.controller');

const secuirtyRoutes = express.Router();

secuirtyRoutes.get('/', notificationController.createNotificationWeb);

module.exports = secuirtyRoutes;