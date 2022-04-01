const PostMarkMailAdapter = require('./postmark/postmake.adapter');
const OutLookMailAdapter = require('./outlook/outlook.adapter')

class EmailAdapter {
    static getEmailAdatapter(provider) {
        switch (provider) {
            case 'outlook':
                return new OutLookMailAdapter();
            case 'postmark':
                return new PostMarkMailAdapter();
        }
    }
}

module.exports = EmailAdapter;