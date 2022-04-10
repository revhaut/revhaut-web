const accountRepository = require('./account.repository');
const sharedService = require('../../shared/shared.service');
const countryService = require('../country/country.service');
const walletService = require('../wallet/wallet.service');
const dayjs = require('dayjs');
const duration = require('dayjs/plugin/duration');
const emailConfig = require('../../configs/email.config');
const config = require('../../configs/app.config');
dayjs.extend(duration);
class AccountService {
    async createAccount(requestData) {
        const { email, password, first_name, last_name, user_type } = requestData;
        const { data: user_exist } = await this.userExist(email);
        if (user_exist) {
            if (user_exist.email_confirm) {
                return { is_success: true, destination: '/login', message: 'user already exist kindly login' };
            }
            return {
                is_success: true,
                destination: 'account/generate-token',
                message: ' kindly generate new verification token ',
            };
        }
        const hashedPassword = await sharedService.hashPassword(password);
        const token = { token: sharedService.generateToken(), createdAt: dayjs().format() };
        const revhaut_tag = await sharedService.generateRaenestTag(first_name, last_name);
        const data = {
            ...requestData,
            email: email.trim().toLowerCase(),
            email_token: token,
            password: hashedPassword,
            revhaut_tag,
        };
        //create a user
        const { data: user } = await sharedService.queryHandler(accountRepository.create(data));
        const walletData = {
            currency: 'USD',
            user_id: user.id,
        };
        //get user country
        const userCountry = await countryService.getCountryByCode({ country_code: data.country });
        if (userCountry.name == 'Nigeria') {
            walletData.currency = 'NGN';
        }
        //create a default USD wallet
        await sharedService.queryHandler(walletService.createWallet(walletData));
        const emailData = {
            to: email,
            template_id: emailConfig.postmark.templates.registrationVerification,
            subject: 'Account Verification',
            dynamic_data: {
                email,
                first_name,
                last_name,
                token: token.token,
            },
        };
        const { is_success, data: result } = await sharedService.sendEmail(emailData);
        if (!is_success) {
            return { is_success: false, message: 'error generating verification token' };
        }
        return { is_success: true, message: 'request successful' };
    }
    async verifyToken(data) {
        const { token, email } = data;
        const { data: user } = await this.userExist(email);
        const difference = dayjs.duration(dayjs().diff(dayjs(user.email_token.createdAt)));
        if (difference.asHours() < config.tokenLife) {
            if (token == user.email_token.token) {
                const email_token = {
                    token: 0,
                    createdAt: dayjs().format(),
                };
                await sharedService.queryHandler(accountRepository.update({ id: user.id }, { email_token, email_confirm: true }));
                return { is_success: false, message: 'account verify successfully' };
            }
            return { is_success: true, message: 'bad request' };
        }
        return { is_success: true, message: 'token has expire' };
    }
    async generateVerificationToken(data) {
        const { email } = data;
        const { data: user } = await this.userExist(email);
        if (!user) {
            return { is_success: true, message: 'invalid request' };
        }
        const email_token = { token: sharedService.generateToken(), createdAt: dayjs().format() };
        await sharedService.queryHandler(accountRepository.update({ id: user.id }, { email_token }));
        const emailData = {
            to: email,
            template_id: emailConfig.postmark.templates.registrationVerification,
            subject: 'Account Verification',
            dynamic_data: {
                email,
                first_name: user.first_name,
                last_name: user.last_name,
                token: email_token.token,
            },
        };
        const { is_success } = await sharedService.sendEmail(emailData);
        if (!is_success) {
            return { is_success: true, message: 'error sending verification token' };
        }
        return { is_success: false, message: 'account verify successfully' };
    }
    async userExist(email) {
        return await sharedService.queryHandler(accountRepository.findUnique({ email }));
    }
    async userLogin(requestData) {
        const { email, password } = requestData;
        const { data: user_exist } = await this.userExist(email);
        const isValidPassword = await sharedService.isAMatchPassword(password, user_exist.password);
        if (!isValidPassword) {
            const login_attempt = user_exist.login_attempt + 1;
            if (user_exist.login_attemp > 3) {
                return { is_success: true, message: 'Account is block' };
            }
            await sharedService.queryHandler(accountRepository.update({ id: user_exist.id }, { login_attempt }));
            return { is_success: true, message: 'email or password is not valid' };
        }
        if (!user_exist.email_confirm) {
            return { is_success: false, message: 'account not verify, kindly verifiy the account', data: { url: '/account/verification' } };
        }
        await sharedService.queryHandler(accountRepository.update({ id: user_exist.id }, { login_attempt: 0 }));
        const returnData = { id: user_exist.id, role: user_exist.user_type, firstname: user_exist.first_name };
        return { is_success: true, message: 'login successful', data: returnData };
    }
}

module.exports = new AccountService();