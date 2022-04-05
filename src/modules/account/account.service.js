const accountRepository = require('./account.repository');
const sharedService = require('../../shared/shared.service');
const countryService = require('../country/country.service');
const walletService = require('../wallet/wallet.service');
const UserType = require('../../shared/utils/usertype.enum');
const dayjs = require('dayjs');
const duration = require('dayjs/plugin/duration');
const emailConfig = require('../../configs/email.config')
const config = require('../../configs/app.config')
dayjs.extend(duration);
class AccountService {

    async createAccount(requestData) {
        const { email, password, first_name, last_name, user_type } = requestData;
        const { data: user_exist } = await this.userExist(email);
        if (user_exist) {
            const emailData = {
                to:email,
                template_id:emailConfig.postmark.templates.registrationVerification,
                subject:"Account Verification",
                dynamic_data:{
                    first_name:user_exist.first_name,
                    last_name:user_exist.last_name,
                    email:email,
                    token: user_exist.email_token.token,
                }
            }
            const {is_success,error,data:result} = await sharedService.sendEmail(emailData);
            return {is_success:true, message:'request successful'}

            throw new BadRequestException({
                message: translate(translatekey.ACT_EMAIL_EXIST),
            });
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
        const { data: newUser } = await sharedService.queryHandler(accountRepository.create( data ));
        if(newUser.id != ""){
            const walletData = {
                currency:'USD',
                user_id:newUser.id
            }
            //create a default USD wallet
            const userCountry = await countryService.getCountryByCode({country_code:data.country});
            if(userCountry.name == 'Nigeria'){
                walletData.currency = 'NGN'
            }
            const {data:userWallet} = await sharedService.queryHandler(walletService.createWallet(walletData));
            const emailData = {
                to:email,
                template_id:emailConfig.postmark.templates.registrationVerification,
                subject:"Account Verification",
                dynamic_data:{
                    first_name,
                    last_name,
                    token: token.token,
                }
            }
            const {is_success,error,data:result} = await sharedService.sendEmail(emailData);
            if(!is_success){

            }
            return {is_success:true, message:'',disttination:'verification'}
        }
        return {is_success:false, message:'',disttination:''}
    }

    async vendorRegistration(vendorData) {
        const { first_name, last_name, password } = vendorData;
        const { data: exist } = await this.userExist(vendorData.email);

        if (exist) {
            if (exist.delay_verification) {
                return { is_success: true, dashboard: { user: { id: exist.id } } };
            }
            throw new RNBadRequestException({
                message: translate(translatekey.ACT_EMAIL_EXIST),
            });
        }

        let is_success = false,
            token = ' ';
        if (!delay_verification) {
            const {
                is_success,
                data: { token },
            } = await this.sendVerificationToken({
                first_name,
                last_name,
                email,
                type: translate(translatekey.EMAIL_CONFIRM),
            });
        }

        if (is_success) {
            const message = translate(translatekey.CHECK_EMAIL_FOR_TOKEN);
            const hashedPassword = await this.sharedService.hashPassword(password);
            const raenest_tag = await this.sharedService.generateRaenestTag(first_name, last_name);
            const data = {
                email,
                first_name,
                last_name,
                membership_type,
                email_token: token,
                password: hashedPassword,
                raenest_tag,
            };
            const { data: user } = await this.sharedService.queryHandler(userRepository.create({ data }));



            return {
                is_success: true,
                message,
                destination: 'email-verification',
                dashboard: { user: { id: user.id } },
            };
        }
        return { is_success, message };
    }
    async affiliateRegistration(affiliateData) {
        const { data: exist } = await this.userExist(email);
        if (exist) {
            if (delay_verification) {
                return { is_success: true, dashboard: { user: { id: exist.id } } };
            }
            throw new RNBadRequestException({
                message: translate(translatekey.ACT_EMAIL_EXIST),
            });
        }

        let is_success = false,
            token = ' ';
        if (!delay_verification) {
            ({
                is_success,
                data: { token },
            } = await this.sendVerificationToken({
                first_name,
                last_name,
                email,
                type: translate(translatekey.EMAIL_CONFIRM),
            }));
        }

        if (is_success) {
            const message = translate(translatekey.CHECK_EMAIL_FOR_TOKEN);
            const hashedPassword = await this.sharedService.hashPassword(password);
            const raenest_tag = await this.sharedService.generateRaenestTag(first_name, last_name);
            const data = {
                email,
                first_name,
                last_name,
                membership_type,
                email_token: token,
                password: hashedPassword,
                raenest_tag,
            };
            const { data: user } = await this.sharedService.queryHandler(userRepository.create({ data }));

            //create a default USD wallet
            const wallet_dto = {
                default: true,
                currency: 'USD',
                type: WalletTypes.FIAT,
            };
            if (membership_type === UserType.EMPLOYER) {
                const company_data = {
                    user_id: user.id,
                    name: company_name,
                    description: '',
                };
                await this.companyService.create(company_data);
            } else {
                await this.walletService.create(wallet_dto, { id: user.id });
            }
            return {
                is_success: true,
                message,
                destination: 'email-verification',
                dashboard: { user: { id: user.id } },
            };
        }
        return { is_success, message };
    }

    async verifyToken(data) {
        const { token, email } = data;
        const { data: user } = await this.userExist(email);
        let is_success = false;
        const difference = dayjs.duration(dayjs().diff(dayjs(user.email_token.createdAt)));
        if (difference.asHours() < config.tokenLife) {
            if (token == user.email_token.token) {
                const email_token = {
                    token:0,
                    createdAt:dayjs().format()
                }
                const {data:userWallet} = await sharedService.queryHandler(accountRepository.update({id:user.id},{email_token}));

                is_success = true;
            }
        }
        return is_success;
    }
    async userExist(email) {
        return await sharedService.queryHandler(accountRepository.findUnique({email}))
    }
}

module.exports = new AccountService();