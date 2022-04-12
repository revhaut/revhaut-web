const defaultRoutes = require('../../modules/_default/default.routest');
const productRoutes = require('../../modules/product/routes/product.web.routes');
const categoryRoutes = require('../../modules/category/routes/category.web.routes');
const settingRoutes = require('../../modules/setting/routes/setting.web.routes');
const dashboardRoutes = require('../../modules/dashboard/routes/dashboard.web.routes');

const routes = async app => {
    app.use('/', defaultRoutes);
    app.use('/product', productRoutes);
    app.use('/setting', settingRoutes);
    app.use('/profile', productRoutes);
    app.use('/category', categoryRoutes);
    app.use('/transaction', productRoutes);
    app.use('/dashboard', dashboardRoutes);
};

module.exports = routes;