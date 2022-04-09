const ejs = require('ejs');
const nodemailer = require('nodemailer');
var path = require('path');

class OutLookClient {
    _mailOption;
    _auth;
    _transporter;
    constructor() {
        // initialize the mail transporter
        this._transporter = nodemailer.createTransport({
            host: 'smtp.postmarkapp.com',
            port: 2525,
            auth: {
                user: 'e5c81dbe-29f5-4480-b1ab-98e21d83f64b',
                pass: 'e5c81dbe-29f5-4480-b1ab-98e21d83f64b',
            },
        });
    }

    _renderTemplate(data) {
        return ejs.renderFile(`${__dirname}/../templates/${data.template_id}.ejs`, data.dynamic_data);
    }

    // Send wmail
    async sendEmail(data) {
        const { subject, from, to } = data;
        const emailTemplate = await this._renderTemplate(data);
        this._mailOption = {
            subject,
            from,
            to,
            html: emailTemplate,
        };

        const mailResponse = await this._transporter.sendMail(this._mailOption);

        if (mailResponse.err) {
            return { is_success: false, error: mailResponse };
        }

        return { is_success: true, details: mailResponse };
    }
}

module.exports = new OutLookClient();