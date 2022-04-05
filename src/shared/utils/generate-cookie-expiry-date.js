import * as config from '../../configs/app.config';

export const generateCookieExpiryDate = (rememberMe = false) => {
    const expiresIn = new Date();

    if (rememberMe) {
        return expiresIn.setMinutes(expiresIn.getMinutes() + config.rememberMeTokenLife);
    }

    return expiresIn.setMinutes(expiresIn.getMinutes() + config.tokenLife);
};