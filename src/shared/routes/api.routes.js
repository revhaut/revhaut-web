const accountApiRoute = require('../../modules/account/routes/account.api.routes');
const userApiRoute = require('../../modules/user/routes/user.api.routes');
const countryApiRoute = require('../../modules/country/routes/country.api.routes');

const routes = async app => {
    app.use('/api/account', accountApiRoute);
    app.use('/api/wallet', userApiRoute);
    app.use('/api/product', userApiRoute);
    app.use('/api/profile', userApiRoute);
    app.use('/api/user_role', userApiRoute);
    app.use('/api/transaction', userApiRoute);
    app.use('/api/payment', userApiRoute);
    app.use('/api/countries', countryApiRoute);
    //app.use('/api/profiles', userApiRoute);s
};

module.exports = routes;