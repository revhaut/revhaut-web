
const outlookClient = require('./outlook.client')

class OutLookMailAdapter {
    async sendEmail(data) {
        const response = await outlookClient.sendEmail(data);
        console.log(response);
        const { is_success, details, error } = response;
        if (!is_success) {
            return { is_success, error };
        }
        return { is_success, data: details };
    }
}

module.exports = OutLookMailAdapter;