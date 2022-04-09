const accountApiRoute = require('../../modules/account/routes/account.api.routes');
const userApiRoute = require('../../modules/user/routes/user.api.routes');
const countryApiRoute = require('../../modules/country/routes/country.api.routes');
const categoryApiRoute = require('../../modules/category/routes/category.api.routes');

const routes = async app => {
    app.use('/api/account', accountApiRoute);
    app.use('/api/wallets', userApiRoute);
    app.use('/api/products', userApiRoute);
    app.use('/api/profiles', userApiRoute);
    app.use('/api/user_roles', userApiRoute);
    app.use('/api/transaction', userApiRoute);
    app.use('/api/payments', userApiRoute);
    app.use('/api/countries', countryApiRoute);
    app.use('/api/categories', categoryApiRoute);
};

module.exports = routes;