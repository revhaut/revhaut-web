const { isValidPhoneNumber, countryCode } = require('libphonenumber-js');

const validatePhoneNumber = data => {
    const { phoneNumber, countryCode = 'NG' } = data;
    return isValidPhoneNumber(phoneNumber, countryCode);
};

const joiCustomPhoneNumberValidation = (value, helpers) => {
    if (validatePhoneNumber({ phoneNumber: value, countryCode: 'NG' })) {
        return value;
    }
    return helpers.error('any.invalid');
};

module.exports = { validatePhoneNumber, joiCustomPhoneNumberValidation };