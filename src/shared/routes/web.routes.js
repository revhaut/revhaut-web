const defaultRoutes = require('../../modules/_default/default.routest');
const affiliateRoute = require('../../modules/affiliate/affiliate.routes');
const vendorRoute = require('../../modules/vendor/vendor.routes');

const routes = async(app) => {
    app.use('/', defaultRoutes);
    app.use('/affiliate', affiliateRoute);
    app.use('/vendor', vendorRoute);
};

module.exports = routes;