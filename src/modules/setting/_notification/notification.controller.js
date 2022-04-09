const createNotificationWeb = async(request, response) => {
    const locals = {
        title: 'account verification',
        scripts: ['<script src="/app/auth/verification.js"></script>'],
        csrfToken: request.csrfToken(),
    };
    return response.render('settings/add-payout', {
        layout: '_layouts/authenticate',
        locals,
        csrfToken: request.csrfToken(),
    });
};

module.exports = {
    createNotificationWeb,
};