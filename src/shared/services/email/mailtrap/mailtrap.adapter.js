
const mailtrapClient = require('./mailtrap.client')

class MailTrapAdapter {
    async sendEmail(data) {
        const response = await mailtrapClient.sendEmail(data);
        const { is_success, details, error } = response;
        if (!is_success) {
            return { is_success, error };
        }
        return { is_success, data: details };
    }
}

module.exports = MailTrapAdapter;