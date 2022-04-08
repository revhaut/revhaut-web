const sharedService = require('../../shared/shared.service');
const vendorRepository = require('./vendor.repository');

const index = async (request, response, next) => {
  try {
    // const user = await db.from('users').where({ id: 'e067283a-1c32-4183-be7d-13c1241c41ce' });

    const products = await vendorRepository.vendorDashboardStats();
    const locals = {
      title: 'DSashboard',
      page: 'Dashboard',
      scripts: ['<script src="/vendors/editor/farmingDetails.js"></script>'],
    };
    return response.render('vendors/dashboard', {
      layout: '_layouts/vendor',
      products,
      locals,
    });
  } catch (error) {
    return next(error);
  }
};

const product = async (request, response) => {
  const products = await sharedService.queryHandler(vendorRepository.findVendorProducts());

  const locals = {
    title: 'dashboard',
    page: 'Product',
    scripts: ['<script src="/vendors/editor/farmingDetails.js"></script>'],
  };
  console.log(products);
  return response.render('vendors/product', {
    layout: '_layouts/vendor',
    locals,
    products: products.data,
    csrfToken: request.csrfToken(),
  });
};

const createProduct = async (request, response) => {
  const locals = {
    title: 'dashboard',
    page: 'Product',
    scripts: ['<script src="/vendors/editor/farmingDetails.js"></script>'],
  };
  return response.render('vendors/product', {
    layout: '_layouts/vendor',
    locals,
  });
};

const transaction = async (request, response) => {
  const locals = {
    title: 'dashboard',
    page: 'Transaction',
    scripts: ['<script src="/vendors/editor/farmingDetails.js"></script>'],
  };
  return response.render('vendors/transaction', {
    layout: '_layouts/vendor',
    locals,
  });
};

const personalInformation = async (request, response) => {
  const locals = {
    title: 'dashboard',
    page: 'Personalinfo',
    scripts: ['<script src="/vendors/editor/farmingDetails.js"></script>'],
  };
  return response.render('vendors/settings/personal-info', {
    layout: '_layouts/vendor',
    locals,
  });
};
const payout = async (request, response) => {
  const locals = {
    title: 'dashboard',
    page: 'Payout',
    scripts: ['<script src="/vendors/editor/farmingDetails.js"></script>'],
  };
  return response.render('vendors/settings/payout', {
    layout: '_layouts/vendor',
    locals,
  });
};
const notification = async (request, response) => {
  const locals = {
    title: 'dashboard',
    page: 'Notification',
    scripts: ['<script src="/vendors/editor/farmingDetails.js"></script>'],
  };
  return response.render('vendors/settings/notification', {
    layout: '_layouts/vendor',
    locals,
  });
};
const security = async (request, response) => {
  const locals = {
    title: 'dashboard',
    page: 'Security',
    scripts: ['<script src="/vendors/editor/farmingDetails.js"></script>'],
  };
  return response.render('vendors/settings/security', {
    layout: '_layouts/vendor',
    locals,
  });
};
const sales = async (request, response) => {
  const locals = {
    title: 'dashboard',
    page: 'Sale',
    scripts: ['<script src="/vendors/editor/farmingDetails.js"></script>'],
  };
  return response.render('vendors/sale', { layout: '_layouts/vendor', locals });
};
module.exports = {
  index,
  transaction,
  security,
  notification,
  payout,
  personalInformation,
  sales,
  product,
  createProduct,
};
