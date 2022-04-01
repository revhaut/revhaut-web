const provider = process.env.MAIL_SERVICE;
const senderEmail = process.env.SENDER_EMAIL;

module.exports = { senderEmail, provider };
