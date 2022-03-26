import express from 'express';
import dashboardController from './dashboard.controller';

const dashboardRoutes = express.Router();

dashboardRoutes.get('/dashboard', dashboardController.index);
dashboardRoutes.get('/vendor', dashboardController.vendorDashboard);

export default dashboardRoutes;
