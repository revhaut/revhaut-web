const index = async(request, response) => {
    const locals = {
        title: 'dashboard',
        page: 'Dashboard',
        scripts: ['<script src="/vendors/editor/farmingDetails.js"></script>'],
    };
    response.render('affiliates/dashboard', {
        layout: '_layouts/affiliate',
        locals,
    });
};
const marketPlace = async(request, response) => {
    const locals = {
        title: 'dashboard',
        page: 'Marketplace',
        scripts: ['<script src="/vendors/editor/farmingDetails.js"></script>'],
    };
    return response.render('affiliates/market-place', {
        layout: '_layouts/affiliate',
        locals,
    });
};
const transaction = async(request, response) => {
    const locals = {
        title: 'dashboard',
        page: 'Transaction',
        scripts: ['<script src="/vendors/editor/farmingDetails.js"></script>'],
    };
    return response.render('affiliates/transaction', {
        layout: '_layouts/affiliate',
        locals,
    });
};
const refferals = async(request, response) => {
    const locals = {
        title: 'dashboard',
        page: 'Refferral',
        scripts: ['<script src="/vendors/editor/farmingDetails.js"></script>'],
    };
    return response.render('affiliates/refferral', {
        layout: '_layouts/affiliate',
        locals,
    });
};
const setting = async(request, response) => {
    const locals = {
        title: 'dashboard',
        page: 'Setting',
        scripts: ['<script src="/vendors/editor/farmingDetails.js"></script>'],
    };
    return response.render('affiliates/settings', {
        layout: '_layouts/affiliate',
        locals,
    });
};
const personalInformation = async(request, response) => {
    const locals = {
        title: 'dashboard',
        page: 'Personalinfo',
        scripts: ['<script src="/vendors/editor/farmingDetails.js"></script>'],
    };
    return response.render('affiliates/settings/personal-info', {
        layout: '_layouts/affiliate',
        locals,
    });
};
const payout = async(request, response) => {
    const locals = {
        title: 'dashboard',
        page: 'Payout',
        scripts: ['<script src="/vendors/editor/farmingDetails.js"></script>'],
    };
    return response.render('affiliates/settings/payout', {
        layout: '_layouts/affiliate',
        locals,
    });
};
const notification = async(request, response) => {
    const locals = {
        title: 'dashboard',
        page: 'Notification',
        scripts: ['<script src="/vendors/editor/farmingDetails.js"></script>'],
    };
    return response.render('affiliates/settings/notification', {
        layout: '_layouts/affiliate',
        locals,
    });
};
const security = async(request, response) => {
    const locals = {
        title: 'dashboard',
        page: 'Security',
        scripts: ['<script src="/vendors/editor/farmingDetails.js"></script>'],
    };
    return response.render('affiliates/settings/security', {
        layout: '_layouts/affiliate',
        locals,
    });
};
const sales = async(request, response) => {
    const locals = {
        title: 'dashboard',
        page: 'Sale',
        scripts: ['<script src="/vendors/editor/farmingDetails.js"></script>'],
    };
    return response.render('affiliates/sale', {
        layout: '_layouts/affiliate',
        locals,
    });
};

module.exports = {
    index,
    marketPlace,
    transaction,
    refferals,
    setting,
    security,
    notification,
    payout,
    personalInformation,
    sales,
};