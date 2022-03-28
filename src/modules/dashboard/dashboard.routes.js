const express = require('express');
const dashboardController = require('./dashboard.controller');

const dashboardRoutes = express.Router();

dashboardRoutes.get('/dashboard', dashboardController.index);
dashboardRoutes.get('/vendor', dashboardController.vendorDashboard);

module.exports = dashboardRoutes;