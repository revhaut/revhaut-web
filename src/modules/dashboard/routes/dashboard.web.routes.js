const express = require('express');
const dashboardController = require('../dashboard.controller');

const dashboardRoutes = express.Router();

dashboardRoutes.get('/admin', dashboardController.index);
dashboardRoutes.get('/vendor', dashboardController.vendorDashboard);
dashboardRoutes.get('/affiliate', dashboardController.affiliateDashboard);

module.exports = dashboardRoutes;