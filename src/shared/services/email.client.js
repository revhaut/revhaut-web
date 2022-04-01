import axios from 'axios';
import dayjs from 'dayjs';
import appConfig from '../configs/app.config';
class EmailClient {
    sendGrid = appConfig.sendGrid;
    async makeRequest({ endpoint, method, data }) {
            const url = `${this.sendGrid.baseEndpoint}${endpoint}`,
                headers = {
                    Authorization: `Bearer ${this.sendGrid.apiKey}`,
                    'Content-Type': 'application/json',
                };
            return await axios({
                    url,
                    data,
                    headers,
                    method,
                })
                .then(response => this.getResponse(true, response.data))
                .catch(error => {
                    return this.getResponse(false, error.response ? error.response.data : {});
                });
        }
        /**
         *
         * @param {String} from
         * @param {[Object]} to
         * @param {Object} dynamic_data
         * @param {String} template_id
         * @returns {Object}
         */
    async sendEmail({
        from = { email: this.sendGrid.sender, name: this.sendGrid.senderName },
        to,
        dynamic_data,
        template_id,
    }) {
        const data = {
            from,
            template_id,
            personalizations: [{
                to,
                dynamic_template_data: {
                    ...dynamic_data,
                    today: dayjs().format(),
                },
            }, ],
        };
        return await this.makeRequest({
            endpoint: this.sendGrid.sendEmail,
            method: 'POST',
            data,
        });
    }

    /**
     *
     * @param {String} from
     * @param {[]} personalizations
     * @param {String} template_id
     * @returns {Object}
     */
    async sendMultipleEmail({
        from = { email: this.sendGrid.sender, name: this.sendGrid.senderName },
        personalizations,
        template_id,
    }) {
        const data = {
            from: {
                email: from,
            },
            template_id,
            personalizations,
        };
        return await this.makeRequest({
            endpoint: this.sendGrid.sendEmail,
            method: 'POST',
            data,
        });
    }

    getResponse(is_success, data = { errors: [{ message: '' }] }) {
        if (is_success) return { is_success, data };
        return { is_success, error: data.errors[0].message };
    }
}
export default new EmailClient();