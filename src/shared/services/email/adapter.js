const PostMarkMailAdapter = require('./postmark/postmake.adapter');
const OutLookMailAdapter = require('./outlook/outlook.adapter')
const MaltrapAdapter = require('./mailtrap/mailtrap.adapter')

class EmailAdapter {
    static getEmailAdatapter(provider) {
        switch (provider) {
            case 'outlook':
                return new OutLookMailAdapter();
            case 'postmark':
                return new PostMarkMailAdapter();
            case 'mailtrap':
                return new MaltrapAdapter();
        }
    }
}

module.exports = EmailAdapter;