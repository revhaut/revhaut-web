const appConfig = require('./app.config');
const crypto = require('crypto');
const corsOptions = {
    origin: appConfig.development ? true : ['https://revhaut.com', /\.revhaut\.com$/],
    optionsSuccessStatus: 200,
    allowedHeaders: ['Content-Type', 'Authorization', appConfig.authName],
    credentials: true,
};

const sessionName = crypto.createHash('sha256').update('RNST').digest('hex');

const cookieOption = {
    secret: appConfig.appKey,
    parseOptions: {
        path: '/',
        name: sessionName,
        resave: true,
        signed: true,
        saveUninitialized: true,
        httpOnly: true,
        domain: process.env.COOKIES_DOMAIN || 'revhaut.com',
        secure: process.env.COOKIES_SECURE === 'false' ? false : true,
        sameSite: process.env.COOKIES_SAMESITE || 'Strict',
    },
};

const helmetOptions = {
    contentSecurityPolicy: {
        directives: {
            defaultSrc: [`'self'`],
            styleSrc: [`'self'`, `'unsafe-inline'`],
            imgSrc: [`'self'`, 'data:', 'validator.swagger.io'],
            scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
        },
    },
};

const getCookiesExpires = () => {
    const expires = new Date();
    expires.setMinutes(expires.getMinutes() + 50); //50 MINUES
    return expires;
};

export { corsOptions, helmetOptions, cookieOption, getCookiesExpires };