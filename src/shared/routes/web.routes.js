const defaultRoutes = require('../../modules/_default/default.routest');
const productRoutes = require('../../modules/product/routes/product.web.routes');


const routes = async(app) => {
    app.use('/', defaultRoutes);
    app.use('/product', productRoutes);
    app.use('/setting', productRoutes);
    app.use('/profile', productRoutes);
    app.use('/transaction', productRoutes);
    app.use('/dashboard', productRoutes);

};

module.exports = routes;