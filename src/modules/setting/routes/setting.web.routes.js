const express = require('express');
const notificationRoute = require('../_notification/routes/notification.web.routes');
const payoutRoute = require('../_payout/routes/payout.web.routes');
const securityRoute = require('../_security/routes/security.web.routes');
const settingController = require('../setting.controller');

const settingRoutes = express.Router();

settingRoutes.get('/', settingController.profileSettingWeb);
settingRoutes.use('/notification', notificationRoute);
settingRoutes.use('/payout', payoutRoute);
settingRoutes.use('/security', securityRoute);
module.exports = settingRoutes;