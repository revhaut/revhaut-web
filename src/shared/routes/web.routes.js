const defaultRoutes = require('../../modules/_default/default.routest');
const productRoutes = require('../../modules/product/routes/product.web.routes');
const vendorRoutes = require('../../modules/vendor/vendor.routes');

const routes = async app => {
  app.use('/', defaultRoutes);
  app.use('/product', productRoutes);
  app.use('/vendor', vendorRoutes);
  app.use('/setting', productRoutes);
  app.use('/profile', productRoutes);
  app.use('/transaction', productRoutes);
  app.use('/dashboard', productRoutes);
};

module.exports = routes;
