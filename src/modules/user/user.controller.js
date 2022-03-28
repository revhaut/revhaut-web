const dashboard = async(request, response) => {
    response.render('users/dashboard', { layout: '_layouts/default' });
};
const profile = async(request, response) => {
    response.render('users/dashboard', { layout: '_layouts/default' });
};

export default {
    dashboard,
    profile,
};