const homeController = async(request, response) => {
    const locals = {
        title: 'Revhaut Home Page',
        page_name: 'home',
    };
    response.render('index', { layout: '_layouts/default', locals });
};
const aboutController = async(request, response) => {
    const locals = {
        title: 'Revhaut About Us',
        page_name: 'about-us',
    };
    response.render('about-us', { layout: '_layouts/default', locals });
};

const contactController = async(request, response) => {
    const locals = {
        title: 'Revhaut Home Page',
        class: 'active',
        page_name: 'about',
    };
    response.render('contact-us', { layout: '_layouts/default', locals });
};

const faqController = async(request, response) => {
    const locals = {
        title: 'Revhaut Home Page',
        class: 'active',
        page_name: 'about',
    };
    response.render('faq', { layout: '_layouts/default' });
};

const privacyController = async(request, response) => {
    const locals = {
        title: 'Revhaut Home Page',
        class: 'active',
        page_name: 'about',
    };
    response.render('privacy-policy', { layout: '_layouts/default' });
};

const termsController = async(request, response) => {
    const locals = {
        title: 'Revhaut Home Page',
        page_name: 'about',
    };
    response.render('terms-condition', { layout: '_layouts/default', locals });
};

const vendoreController = async(request, response) => {
    const locals = {
        title: 'Vendor  Page',
        page_name: 'vendor',
    };
    response.render('vendor', { layout: '_layouts/default', locals });
};

const affiliateController = async(request, response) => {
    const locals = {
        title: 'Affiliate  Page',
        page_name: 'affiliate',
    };
    response.render('affiliate', { layout: '_layouts/default', locals });
};

module.exports = {
    homeController,
    aboutController,
    affiliateController,
    vendoreController,
    termsController,
    privacyController,
    faqController,
    contactController,
};