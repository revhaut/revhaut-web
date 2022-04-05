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
            host: "smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "49ce24e8b6cbd8",
              pass: "847bd6ed40f1d2"
            }
        });
    }

    _renderTemplate(data) {

        return ejs.renderFile(`${__dirname}/../templates/${data.template_id}.ejs`, data.dynamic_data);
    }

    // Send wmail
    async sendEmail(data) {
        const {subject,from,to} = data
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

module.exports= new OutLookClient();