const bcrypt = require('bcrypt');
const BadRequestException = require('./exceptions/bad-request.exception');
const UnknownException = require('./exceptions/unknown-exception');
const userRepository = require('../modules/user/user.repository');
const emailService = require('../shared/services/email');
const config = require('../configs/email.config');
class SharedService {
    //shared service method here
    async isAMatchPassword(password, newPassword) {
        return await bcrypt.compare(password, newPassword);
    }
    async hashPassword(password) {
        const saltRound = 10;
        return await bcrypt.hash(password, saltRound);
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

    async sendEmail(data) {
        const { to, dynamic_data, template_id, subject } = data;
        const emailData = {
            to,
            subject,
            template_id,
            dynamic_data,
            from: `${config.postmark.senderEmail}`,
        };
        return await emailService({ params: emailData });
    }

    generateRandomPassword(length = 15) {
        //generate 3 uppercase
        //generate 3 lowercase
        //genrate 2 numbers
        //generate 4 symbol
        const uppercaseAndNumber = this.generateRandomAlphabets(4, false);
        const lowercaseAndNumber = this.generateRandomAlphabets(4);
        let randomNumber = this.generateToken().toString();
        randomNumber = randomNumber.substring(0, 3);
        const randomSign = '!@$%';
        const characters = `${uppercaseAndNumber}${randomSign}${lowercaseAndNumber}${randomNumber}`;
        let random = '';

        for (let i = 0; i < length; i++) {
            random += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return random.trim();
    }

    generateRandomAlphaNumeric(length, toLowerCase = true) {
        let random = '';
        const alhpabet = 'ABCDEFGWHJKLMNWPQRSTUYZ';
        const characters = '2ABC3DEFGH45JKL69MN67PQRSTUV76WXYZ';
        for (let i = 0; i < length; i++) {
            random += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        if (toLowerCase) return random.toLowerCase();
        return random.trim();
    }

    generateRandomAlphabets(length, toLowerCase = true) {
        let random = '';
        const characters = 'ABCDEFGWHJKLMNWPQRSTUYZ';
        for (let i = 0; i < length; i++) {
            random += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        if (toLowerCase) return random.toLowerCase();
        return random.trim();
    }

    async uploadtoS3({ key, file, allowed_extension = [], bucket_name = appConfig.aws.bucketName }) {
        const { mimetype } = file;
        const file_extension = mimetype.split('/')[1];
        if (!allowed_extension.includes(file_extension))
            throw new BadRequestException({
                message: `Only ${allowed_extension.join(',')} is accepted`,
            });

        file._buf = await file.toBuffer();
        const url_key = `${key}.${file_extension}`;
        const { is_success } = await AWSFileUpload.uploadSingleFile(file, url_key, bucket_name);
        return { is_success, url_key };
    }

    generateRefId(id) {
        return `${this.generateRandomAlphaNumeric(3)}${id}${this.generateRandomAlphaNumeric(2)}`;
    }

    async generatePDF(html) {
        const browser = await puppeteer.launch({
            headless: true,
            executablePath: process.env.CHROME_BIN || null,
            args: ['--disable-gpu', '--disable-dev-shm-usage', '--disable-setuid-sandbox', '--no-sandbox'],
        });

        const page = await browser.newPage();
        await page.setContent(html);
        const buffer = await page.pdf({
            format: 'letter',
            printBackground: true,
        });
        await browser.close();
        return buffer;
    }

    async isActionAllowed({ current_user, password }) {
        if (current_user.two_fa) {
            if (!(await verify2FAToken(current_user.two_fa_secret, password))) {
                return false;
            }
        } else {
            if (!(await this.isAMatchPassword(password, current_user.password))) {
                return false;
            }
        }
        return true;
    }

    getAddress(addresses, type = 'postal') {
        return addresses.find(address => address.type == type) ? address : '';
    }
    updateAddress(addresses, type = 'postal', new_address) {
        delete new_address.type;
        const old_addresses = addresses.filter(address => address.type !== type);
        return old_addresses ? [...old_addresses, { type, address: {...new_address } }] : [{ type, address: {...new_address } }];
    }

    getRaenestAddress(shipping = false) {
        const address = {
            country: 'US',
            state: 'Delaware',
            city: 'Middletown',
            postal_code: '19709',
            line1: '651 N Broad St, Suite 206',
        };
        if (shipping) {
            address['state'] = 'DE';
        }
        return address;
    }

    formatResponse(is_success, data = {}, message = '') {
        return { is_success, data, message };
    }

    generateUniqueRandomString(length = 12) {
        return cryptoRandomString({ length });
    }

    async queryHandler(query, thow_not_found = false) {
        try {
            const data = await query;
            if (thow_not_found && !data) {
                throw new NotFoundException({});
            }
            return { data };
        } catch (error) {
            console.log('DATABASE_ERROR: ', `${error}`);
            throw new UnknownException({});
        }
    }

    async convertCurrency({ amount, currency, target_currency }) {
        //get exchange rates
        const data = {
            original: { amount, currency },
            rate: 1,
            converted: {},
        };
        let rates = await this.cacheManager.get(WISE_RATES);
        if (!rates) {
            const { base, transfer_fund } = appConfig.apiGateway.endpoints.payment_adapters;

            const { is_success, data } = await this.postRNRequest(`${base}${transfer_fund}`, {
                method: 'GetRates',
                provider: 'wise',
                params: {},
            });
            if (is_success) {
                rates = data;
                //cache the rates for 10 minutes
                await this.cacheManager.set(WISE_RATES, rates, {
                    ttl: 60 * 10,
                });
            } else
                return {
                    is_success: false,
                    data: [],
                };
        }

        let targetRate = target_currency === 'USD' ? { rate: 1 } : rates.find(rate => rate.target === target_currency);
        if (target_currency === 'NGN') {
            targetRate = {
                //To do: Get NGN rates from vertox
                rate: adminConfig.rates.NGN,
            };
        }
        let sourceRate = currency === 'USD' ? { rate: 1 } : rates.find(rate => rate.target === currency);

        if (currency === 'NGN') {
            sourceRate = {
                rate: adminConfig.rates.NGN,
            };
        }
        if (!targetRate) {
            throw new RNBadRequestException({
                message: `Currency ${target_currency} is not supported`,
            });
        }
        if (!sourceRate) {
            throw new RNBadRequestException({
                message: `Currency ${currency} is not supported`,
            });
        }
        let rate = Number(targetRate.rate / sourceRate.rate);
        rate = this.formatAmount(rate, 6);
        let rate_inverse = 1 / rate;
        rate_inverse = this.formatAmount(rate_inverse, 6);
        let converted_amount = Number(amount) * rate;
        let converted_amount_inverse = Number(amount) * rate_inverse;
        converted_amount = this.formatAmount(converted_amount, 2);
        converted_amount_inverse = this.formatAmount(converted_amount_inverse, 2);
        const converted = {
            rate,
            amount: converted_amount,
            currency: target_currency,
            created_at: dayjs().toString(),
        };
        const converted_inverse = {
            currency,
            rate: rate_inverse,
            amount: converted_amount_inverse,
            created_at: dayjs().toString(),
        };

        const amount_hash = Encryption.encrypt(JSON.stringify(converted), appConfig.encryptionKey2);
        const inv_amount_hash = Encryption.encrypt(JSON.stringify(converted_inverse), appConfig.encryptionKey2);
        delete converted.created_at;
        data.rate = rate;
        data.converted = {
            ...converted,
            amount_hash,
            inv_amount_hash,
        };

        return {
            is_success: true,
            data,
        };
    }

    stringToBoolean(s) {
        return s.toLowerCase() === 'true' ? true : false;
    }

    async convertCurrencySimple({ amount, currency, target_currency }) {
        if (currency === target_currency) {
            return { amount: this.formatAmount(amount), rate: 1 };
        }
        const { is_success, data: converted_amount } = await this.convertCurrency({
            currency,
            amount,
            target_currency,
        });

        if (is_success) {
            const { amount, rate } = converted_amount.converted;
            return { amount, rate };
        }
        throw new RNUnknownException({});
    }

    formatAmount(amount, decimal = 2) {
        const formatted_amount = Number(amount).toFixed(decimal);
        return Number(formatted_amount);
    }
    formatCurrency(amount) {
        return new Intl.NumberFormat('en-US').format(amount);
    }

    generateToken() {
        const min = 101001,
            max = 992019;
        const token = Math.random() * (max - min) + min;
        const now = parseInt(new Date().getTime().toString().substring(token[2], 8));
        return parseInt((token * now).toString().substring(0, 6));
    }

    getCardCountryDetails(address = null) {
        const card_countries = adminConfig.physical_card_countries;
        if (!address) {
            return card_countries.others;
        }

        const country = address.toUpperCase();
        const IsAmerica = card_countries.us.countries.filter(card_country => card_country.code === country);
        const IsUk = card_countries.uk.countries.filter(card_country => card_country.code === country);
        const IsEu = card_countries.eu.countries.filter(card_country => card_country.code === country);
        if (IsAmerica || IsUk || IsEu) {
            if (IsAmerica.length > 0) {
                return card_countries.us;
            }
            if (IsUk.length > 0) {
                return card_countries.uk;
            }
            if (IsEu.length > 0) {
                return card_countries.eu;
            }
        }
        return card_countries.others;
    }

    async getHolidayByCountry(country, per_page = 5) {
        let holidayList = [];
        const holidayArray = [];
        if (!country) {
            return [];
        }
        holidayList = await this.holidayArray(country);
        holidayList = holidayList.slice(0, per_page);
        holidayList.map(holiday => {
            holidayArray.push({
                country,
                name: holiday.name,
                date: dayjs(holiday.date).format('YYYY-MM-DD'),
            });
        });
        return holidayArray;
    }

    async generateRaenestTag(firstname, lastname) {
        let result;
        const fstring = firstname.substring(0, 4);
        const lstring = lastname.substring(0, 2);
        let random_number = this.generateToken().toString();
        random_number = random_number.substring(0, 4);
        const revhaut_tag = `${fstring}${lstring}${random_number}`.toLocaleLowerCase();
        const { data: tag } = await this.queryHandler(userRepository.findFirst({ revhaut_tag }));
        if (tag) {
            result = this.generateRaenestTag(firstname, lastname);
            return result;
        }
        return revhaut_tag;
    }
    async holidayArray(country) {
        const options = { country, lang: 'en', timeout: 50000 };
        const holidaysList = await getHolidays(options);
        const results = holidaysList.filter(holiday => holiday.date >= new Date());
        return results;
    }
    async isCompanyAdmin({ user_id, company_id, include = false }) {
        let select = {};
        if (include) select = { company: true };
        const { data: companiesAdmin } = await this.queryHandler(
            companyAdminRepository.findFirst({
                where: { user_id, company_id },
                select,
            })
        );
        return companiesAdmin;
    }

    async convertJSONToCSV(data, options = { header: true, delimiter: ',', skipEmptyLines: true }) {
        return Papa.unparse(data, options);
    }

    formatErrors(errors) {
        const formattedErrors = {};
        for (const err of errors) {
            const messages = err.constraints ? Object.values(err.constraints) : err.children.length ? Object.values(err.children[0].constraints) : [''];
            formattedErrors[err.property] = messages[0];
        }
        return formattedErrors;
    }
}

module.exports = new SharedService();