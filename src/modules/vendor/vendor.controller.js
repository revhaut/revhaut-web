const index = async(request, response) => {
    const locals = {
        title: 'dashboard',
        page: 'Dashboard',
        scripts: ['<script src="/vendors/editor/farmingDetails.js"></script>'],
    };
    return response.render('vendors/dashboard', {
        layout: '_layouts/vendor',
        locals,
    });
};

const product = async(request, response) => {
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

const createProduct = async(request, response) => {
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

const transaction = async(request, response) => {
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

const personalInformation = async(request, response) => {
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
const payout = async(request, response) => {
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
const notification = async(request, response) => {
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
const security = async(request, response) => {
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
const sales = async(request, response) => {
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