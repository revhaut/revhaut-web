const userRepository = require('./user.repository');
const sharedService = require('../../shared/shared.service');
const UserType = require('../../shared/utils/usertype.enum');
const emailConfig = require('../../configs/email.config')
const sendEmail = require('../../shared/services/email')
const dayjs = require('dayjs');

class UserService {
    async register(requestData) {
        const { email, password, first_name, last_name, user_type } = requestData;
        const { data: user_exist } = await this.userExist(email);
        if (user_exist) {
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
        const { data: newUser } = await sharedService.queryHandler(userRepository.create( data ));
        // create user wallet

        




        if (user_type == UserType.VENDOR.value) {
            return await this.registrationVendor(requestData);
        }
        else if (user_type == UserType.AFFILIATE.value) {

        }
        // return to controller
    }

    async sendEmailToken({ email, first_name, last_name, type, id = '' }) {
        let token = await this.sharedService.generateToken();
        token = { token, createdAt: dayjs().format() };
        const to = [{ email }],
            dynamic_data = {
                first_name,
                last_name,
                token: token.token,
            };
        let result = {};
        if (type === translate(translatekey.PASSWORD_RESET) || type === translate(translatekey.EMAIL_CONFIRM)) {
            const param = email ? email : id;
            const { data } = await this.profileService.getUserByEmailOrId(param);
            if (!data)
                throw new RNBadRequestException({
                    message: translate(translatekey.USER_NOT_FOUND),
                });

            dynamic_data.first_name = data.first_name;
            dynamic_data.last_name = data.last_name;
            to[0]['email'] = data.email;

            await this.sharedService.sendEmail({
                to,
                dynamic_data,
                template_id: config.sendGrid.templates.users[`${type}`],
            });

            id = data.id;
            result = { email_token: token };
            ShareService.queryHandler();
            return { id };
        }
        throw new RNBadRequestException({});
    }
    async resetPassword({ id, password, stage, token }) {
        const { data: user } = await this.sharedService.queryHandler(userRepository.findUnique({ where: { id } }));

        if (
            user &&
            (await this.sharedService.verifyToken({
                token,
                email_token: user.email_token,
            }))
        ) {
            if (stage == 1) {
                return { id };
            } else {
                const data = {
                    password: await this.sharedService.hashPassword(password),
                    email_token: { token: 0, createdAt: dayjs().format() },
                };
                await this.sharedService.queryHandler(userRepository.update({ where: { id }, data }));
                const email = user.email;
                //send password reset email
                const to = [{ email }],
                    dynamic_data = {
                        first_name: user.first_name,
                        last_name: user.last_name,
                    };
                await this.sharedService.sendEmail({
                    to,
                    dynamic_data,
                    template_id: config.sendGrid.templates.users.PasswordResetSuccess,
                });
                return {
                    id,
                    message: translate(translatekey.ACT_PASSWORD_RESET_SUCCESS),
                };
            }
        }
        throw new RNBadRequestException({
            message: translate(translatekey.WRONG_CONFIRM_CODE),
        });
    }

    async userExist(email) {
        return await sharedService.queryHandler(userRepository.findFirst({ email }));
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

    async sendVerificationToken({ email, first_name, last_name, type, id = '' }) {
        let token = this.sharedService.generateToken();
        token = { token, createdAt: dayjs().format() };
        const to = [{ email }];
        const dynamic_data = {
            first_name,
            last_name,
            token: token.token,
        };
        let data = {};
        const password_reset = translate(translatekey.PASSWORD_RESET);
        if (type === password_reset || !!id) {
            ({ data } =
                type == password_reset ?
                await this.sharedService.queryHandler(userRepository.findFirst({ where: { email } })) :
                await this.sharedService.queryHandler(userRepository.findFirst({ where: { id } })));
            if (!data) {
                throw new RNBadRequestException({
                    message: translate(translatekey.USER_NOT_FOUND),
                });
            }
            dynamic_data.first_name = data.first_name;
            dynamic_data.last_name = data.last_name;
            to[0]['email'] = data.email;
        }

        const resp = await this.sharedService.sendEmail({
            to,
            dynamic_data,
            template_id: config.sendGrid.templates.users[`${type}`],
        });
        if (type === translate(translatekey.EMAIL_CONFIRM) && !!!id) {
            resp['token'] = token;
            return { is_success: true, data: resp };
        }
        data = { email_token: token };
        this.sharedService.queryHandler(userRepository.update({ id }, {data} ));
        return { is_success: true, data: resp };
    }

    async loginUser({ email = '', password = '', id = '', ip = '' }) {
        email = email.trim().toLowerCase();
        const { data: user } = await SharedService.queryHandler(UserRepository.findFirst({ email: email }));

        if (user) {
            const passwordMatch = await this.sharedService.isAMatchPassword(password, user.password);
            if (passwordMatch) {
                const destination = 'dashboard';
                const message = translate(translatekey.ACT_LOGIN_SUCCESS);
                const is_success = true;
                if (user.two_fa) {
                    if (two_fa_code == '') {
                        return {
                            is_success,
                            destination: '2fa',
                            dashboard: { user: { id: user.id } },
                            message: translate(translatekey.ENTER_2FA_TOKEN),
                        };
                    }
                }
                const data = { last_login: dayjs().format(), ip };

                await this.sharedService.queryHandler(
                    userRepository.update({
                        where: { id: user.id },
                        data,
                    })
                );
                delete user.password;
                delete user.pin;
                const dashboard = await this.loadDashboard(user);
                return { is_success, destination, dashboard, message };
            }
            // update login attemp

            throw new RNBadRequestException({
                message: translate(translatekey.ACT_INVALID_LOGIN),
            });
        } else if (id && two_fa_code) {
            const { data: user } = await this.sharedService.queryHandler(userRepository.findFirst({ where: { id } }));
            if (user.two_fa) {
                if (await verify2FAToken(user.two_fa_secret, two_fa_code)) {
                    delete user.password;
                    delete user.pin;
                    const dashboard = await this.loadDashboard(user);
                    return {
                        is_success: true,
                        destination: 'dashboard',
                        user,
                        dashboard,
                        message: translate(translatekey.ACT_LOGIN_SUCCESS),
                    };
                } else {
                    throw new RNBadRequestException({
                        message: translate(translatekey.ACT_INVALID_2FA),
                    });
                }
            }
        } else {
            throw new RNBadRequestException({
                message: translate(translatekey.ACT_INVALID_LOGIN),
            });
        }
    }

    async registrationVendor(vendorData) {
        const { email, password, first_name, last_name } = vendorData;
        const { data: user_exist } = await this.userExist(email);
        if (user_exist) {
            throw new BadRequestException({
                message: translate(translatekey.ACT_EMAIL_EXIST),
            });
        }
        const hashedPassword = await sharedService.hashPassword(password);
        const token = { token: sharedService.generateToken(), createdAt: dayjs().format() };
        const revhaut_tag = await sharedService.generateRaenestTag(first_name, last_name);
        const data = {
            ...vendorData,
            email: email.trim().toLowerCase(),
            email_token: token,
            password: hashedPassword,
            revhaut_tag,
        };
        const { data: user } = await sharedService.queryHandler(userRepository.create( data ));
        // create user wallet

        // send email

        const emailData = {
            from: `${emailConfig.postmark.senderEmail}`,
            to: email,
            subject: 'Account Verification',
            template_id: `${[emailConfig.postmark.templates.registrationVerification]}`,
            dynamic_data: {
            firstname: first_name,
            email: email,
            emailCode:token.token,
            },
        };
        const {is_success} = await sendEmail({ params: emailData });
        if(!is_success){
            // error sending activation code
            // s
        }

        return {
            is_success: true,
            message,
            destination: 'email-verification',
            dashboard: { user: { id: user.id } },
        };
    }
    async registrationAffiliate(data) {
        const { email, password, first_name, last_name } = data;
        const { data: user_exist } = await this.userExist(email);
        if (user_exist){
            throw new RNBadRequestException({
                message: translate(translatekey.WRONG_CONFIRM_CODE),
            });
        }

        // const email_confirm = true;
        // email_token = { token: 0, createdAt: dayjs().format() };
        // await this.sharedService.queryHandler(userRepository.update({ where: { id }, data }));

        // destination = 'dashboard';
        // const message = translate(translatekey.ACT_LOGIN_SUCCESS);
        // const dashboard = await this.loadDashboard(user);
        return {
            is_success: true,
            destination,
            message,
            dashboard,
        };
    }

    async loadDashboard(current_user, switch_company_id = null) {
        if (!current_user) throw new RNUnauthorizedException({});

        if (switch_company_id) {
            this.switchCompany(current_user.id, switch_company_id);
            return { companies: [{ id: switch_company_id }] };
        }
        let company_id;
        //get data from cache
        const dashboardData = await this.cacheManager.get(`DASH${current_user.id}`);
        if (dashboardData) {
            return dashboardData;
        }
        const { id: user_id } = await current_user;
        const user = await this.getUserCompanyAdmins(user_id);
        const { membership_type } = user;
        const dashboard = {};
        dashboard.user = await this.formatUserResponse(user);

        //based on membership type

        switch (membership_type) {
            case UserType.EMPLOYEE:
                const wallet_options = {
                    user_id,
                    is_enabled: true,
                };
                const {
                    data: { records: wallets },
                } = await this.walletService.findAll(wallet_options);
                if (!wallets)
                    throw new RNBadRequestException({
                        errors: {
                            message: translate(translatekey.WALLET_NOT_FOUND),
                        },
                    });
                const my_wallets = wallets.filter(wallet => wallet.type !== translatekey.WALLET_TYPE_CARD);
                dashboard.wallets = my_wallets;

                //get spending statistics from for default wallet
                const default_wallet = await wallets.find(wallet => wallet.default === true);
                const { id: wallet_id } = default_wallet;

                const spendings = await this.transactionService.spending(wallet_id);
                dashboard.spendings = spendings;

                //Transactions
                const transaction_options = { user_id, per_page: 3 };
                const { records: transactions } = await this.transactionService.findAll(transaction_options);
                dashboard.transactions = transactions;

                //Cards
                const card_options = {
                    user: {
                        user_id,
                        per_page: 1,
                        status: StatusTypes.ACTIVE,
                    },
                    currentUser: {},
                };
                const { records: cards } = await this.cardService.getUserCards(card_options);
                dashboard.card = cards.length > 0 ? cards[0] : {};
                // Contract widget
                const contract_options = {
                    user_id,
                    per_page: 2,
                    status: StatusTypes.ACTIVE,
                };
                const { records: contracts } = await this.contractService.getContracts(contract_options);
                dashboard.contracts = contracts;

                //Timeoff widget
                const timeoffs = await this.timeoffService.getDashboardTimeOff(user_id);
                dashboard.timeoffs = timeoffs;

                // get upcoming holiday based on user Country of residence
                // const holidays = await this.sharedService.getHolidayByCountry(country);
                // dashboard.holidays = holidays;
                break;
            case UserType.EMPLOYER:
                const { company_admins } = user;
                //Prompt user to create a team
                if (!company_admins || company_admins.length === 0) {
                    throw new NotFoundException({
                        messsage: translate(translatekey.NO_TEAM_EXIST_CREATE_ONE),
                    });
                }

                const companies = [];
                company_admins.forEach(company_admin => {
                    companies.push({
                        id: company_admin.company.id,
                        payment_pay_date: company_admin.company.payment_pay_date,
                        pay_ahead_weekend: company_admin.company.pay_ahead_weekend,
                        name: company_admin.company.name,
                        user_role: company_admin.role,
                        is_corporate: company_admin.company.is_corporate || false,
                        relation_id: company_admin.id,
                        onboarding_completed: company_admin.company.onboarding_completed,
                    });
                });

                dashboard.companies = companies;

                const lastVisited = await this.companyAdminService.getCompanyLastVisitedByUser(user_id);
                company_id = lastVisited.company.id;

                const company_wallet_options = {
                    company_id,
                    is_enabled: true,
                    is_card_wallet: 'false',
                };
                const {
                    data: { records: company_wallets },
                } = await this.walletService.findAll(company_wallet_options);
                if (!company_wallets || company_wallets.length === 0)
                    throw new NotFoundException({
                        errors: {
                            message: translate(translatekey.WALLET_NOT_FOUND),
                        },
                    });

                const my_company_wallets = company_wallets;
                dashboard.wallets = my_company_wallets;

                //get spending statistics from for default wallet
                const company_default_wallet = await my_company_wallets.find(company_wallet => company_wallet.default === true);
                const { id: company_wallet_id } = company_default_wallet;

                const company_spendings = await this.transactionService.spending(company_wallet_id);
                dashboard.spendings = company_spendings;

                //Transactions
                const company_transaction_options = { company_id, per_page: 3 };
                const { records: company_transactions } = await this.transactionService.findAll(company_transaction_options);
                dashboard.transactions = company_transactions;

                //Cards
                const company_card_options = {
                    user: {
                        company_id,
                        per_page: 1,
                        status: StatusTypes.ACTIVE,
                    },
                    currentUser: {},
                };
                const { records: company_cards } = await this.cardService.getUserCards(company_card_options);
                dashboard.card = company_cards.length > 0 ? company_cards[0] : {};

                //Team Summary
                const country_summary = await this.contractService.getTeamByCountry(company_id);
                const type_summary = await this.contractService.getContractsByType(company_id);
                dashboard.team_summary = {
                    country: country_summary,
                    type: type_summary,
                };

                // due and overdue invoices
                const invoices = await this.invoiceService.getDueandOverDueInvoices(company_id);
                dashboard.invoices = invoices;

                // birthdays
                const birthdays = await this.profileService.getUserBirthdays(company_id);
                dashboard.birthdays = birthdays;

                // Contract widget
                const contract_opt = {
                    company_id,
                    per_page: 2,
                    status: StatusTypes.ACTIVE,
                };
                const { records: company_contracts } = await this.contractService.getContracts(contract_opt);
                dashboard.contracts = company_contracts;

                //TODO
                // Get the list of all the countries this employer have contracts
                // served in an array and replace it with the countries variable below
                // const countries = ['us', 'ca', 'ng'];

                // const counties_holiday: any = [];
                // const promises = countries.map(async (con: any) => {
                //   const holidays = await this.sharedService.getHolidayByCountry(con);
                //   holidays.map((hol) => counties_holiday.push(hol));
                // });
                // await Promise.all(promises);
                // // filter to remove duplicates by name of holiday and date
                // const uniqueArray = counties_holiday.filter(
                //   (v, i, a) =>
                //     a.findIndex((t) => t.date === v.date && t.name === v.name) === i,
                // );
                //TODO
                // if we don't want to merge holidays, we can show all,
                // regardless of the number of countries observing the holiday
                // dashboard.holidays = uniqueArray;
                break;
            default:
                break;
        }

        //cache dashboard data for 5 minutes
        await this.cacheManager.set(`DASH${current_user.id}`, dashboard, {
            ttl: 60 * 5,
        });
        return dashboard;
    }

    async getUserAdmins(user_id) {
        const { data } = await this.sharedService.queryHandler(
            userRepository.findUnique({
                where: { id: user_id },
                include: {
                    company_admins: {
                        orderBy: {
                            last_visited: 'desc',
                        },
                        select: {
                            id: true,
                            company: {
                                select: {
                                    id: true,
                                    name: true,
                                    payment_pay_date: true,
                                    pay_ahead_weekend: true,
                                    is_corporate: true,
                                    onboarding_completed: true,
                                },
                            },
                            role: { select: { name: true, access: true } },
                        },
                    },
                },
            })
        );
        return data;
    }

    async formatUserResponse(user) {
        const { id, email, first_name, last_name, email_confirm, membership_type, phone_confirm, phone_number } = user;
        return {
            id,
            email,
            first_name,
            last_name,
            email_confirm,
            membership_type,
            phone_confirm,
            phone_number,
        };
    }
}

module.exports = new UserService();