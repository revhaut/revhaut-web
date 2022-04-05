
const postMarkClient = require('./postmark.client')

class PostMarkMailAdapter {
    async sendEmail(data) {
        const response = await postMarkClient.sendEmail(data);
        const { is_success, details, error } = response;
        if (!is_success) {
            return { is_success, error };
        }
        return { is_success, data: details,error:'' };
    }
}

module.exports = PostMarkMailAdapter;