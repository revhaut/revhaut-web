const ejs = require('ejs');
const nodemailer = require('nodemailer');
const config = require('./outlook.config');

class OutLookClient {
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
            // host: config.host,
            // port: config.port,
            // auth: {
            //     user: config.username,
            //     pass: config.password,
            // },
            host: "smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "06eb2657d0902a",
              pass: "77e6cb8f68ce23"
            }
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

module.exports= new OutLookClient();