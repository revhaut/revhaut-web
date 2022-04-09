const profileSettingWeb = async(request, response) => {
    const locals = {
        title: 'account verification',
        scripts: ['<script src="/app/auth/verification.js"></script>'],
        csrfToken: request.csrfToken(),
    };
    return response.render('settings/personal-info', {
        layout: '_layouts/authenticate',
        locals,
        csrfToken: request.csrfToken(),
    });
};

module.exports = {
    profileSettingWeb,
};