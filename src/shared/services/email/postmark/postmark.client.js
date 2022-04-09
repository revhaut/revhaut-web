const ejs = require('ejs');
const nodemailer = require('nodemailer');
const config = require('./postmark.config');

class PostMarkClient {
    _mailOption;
    _auth;
    _transporter;
    constructor() {
        // initialize the auth
        this._auth = {
            user: config.username,
            pass: config.password,
        };
        // initialize the mail transporter
        this._transporter = nodemailer.createTransport({
            host: config.host,
            port: config.port,
            auth: {
                user: config.username,
                pass: config.password,
            },
        });
    }

    _renderTemplate(data) {
        return ejs.renderFile(`${__dirname}/../mail-templates/${data.template_id}.ejs`, data.dynamic_data);
    }

    // Send wmail
    async sendEmail(data) {
        // generate the mail temlate
        const emailTemplate = await this._renderTemplate(data);
        this._mailOption = {
            subject: data.subject,
            from: `${data.from}`,
            to: data.to,
            html: emailTemplate,
        };

        const mailResponse = await this._transporter.sendMail(this._mailOption);

        if (mailResponse.err) {
            return { is_success: false, error: mailResponse };
        }

        return { is_success: true, details: mailResponse };
    }
}

module.exports = new PostMarkClient();