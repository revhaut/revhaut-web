const AccountRepository = require('./account.repository');
const SharedService = require('../../shared/shared.service');
const UserType = require('../../shared/utils/usertype.enum');
const dayjs = require('dayjs');
class AccountService {
    async create(requestData) {
        const data = {
            email_token: { token: SharedService.generateToken(), created_at: dayjs().format() },
            ...requestData,
        };
        if (data.user_type === UserType.VENDOR) {
            return await this.vendorRegistration(data);
        } else if (data.user_type === UserType.AFFILIATE) {
            return await this.affiliateRegistration(data);
        } else {}

        const { data: result, is_successful, message } = await AccountRepository.create(data);
        if (!is_successful) {
            return { data: {}, message };
        }
        return { data: result };
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

            //create a default USD wallet
            const wallet_dto = {
                default: true,
                currency: 'USD',
                type: WalletTypes.FIAT,
            };

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

    async verifyToken({ token, email_token }) {
        let is_success = false;
        const difference = dayjs.duration(dayjs().diff(dayjs(email_token.createdAt)));
        if (difference.asHours() < config.tokenLife) {
            if (token == email_token.token) {
                is_success = true;
            }
        }
        return is_success;
    }
    async userExist(email) {
        return await AccountService
    }
}

module.exports = new AccountService();