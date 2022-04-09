const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    appName: process.env.APP_NAME || 'revhaut',
    serverPort: process.env.PORT || 8080,
    apiGateway: {
        baseEndpoint: process.env.RN_API_GATEWAY_ENDPOINT,
        apiKey: process.env.RN_APIGATEWAY_KEY,
        endpoints: {
            admin: {
                base: 'admin/',
                exchange_rates: 'exchange-rates',
            },
            payment_adapters: {
                base: 'payment-adapters/',
                transfer_fund: 'transfer-fund',
            },
            virtual_account_adapters: {
                base: 'virtual-account-adapters/',
                accounts: 'virtual-accounts',
                transfer_fund: 'transfer',
            },
            integration_adapters: {
                xero: {
                    base: 'mkt-integrations/xeros/',
                    auth: 'auth',
                    disconnect: 'disconnect',
                    accounts: 'accounts',
                    redirect: 'redirect_url',
                },
                quickbook: {
                    base: 'integration-adapters/quickbooks/',
                    auth: 'auth',
                    disconnect: 'disconnect',
                    accounts: 'accounts',
                },
            },
            bambo: {},
        },
    },
    providers: {
        virtual_account: {
            providus: {
                provider: 'providus',
                currency: ['NGN'],
            },
            openpayd: {
                currency: ['USD', 'AUD', 'GBP'],
                provider: 'open-payd',
            },
        },
        min_wallet_balance: 3,
    },
    authName: 'rnlekdn',
    tokenLife: 2,
    appKey: process.env.APP_KEY,
    sendGrid: {
        baseEndpoint: 'https://api.sendgrid.com/v3/',
        sendEmail: 'mail/send',
        apiKey: process.env.SENDGRID_KEY,
        sender: process.env.EMAIL_SENDER,
        senderName: process.env.EMAIL_SENDER_NAME || 'Richie from Raenest',
        templates: {
            payroll_error: process.env.PAYMENT_ERROR_EMAIL_TEMPLATE,
            contracts: {
                created: process.env.NEW_CONTRACT_EMAIL_TEMPLATE,
                amended: process.env.NEW_CONTRACT_EMAIL_TEMPLATE,
                employee_signed: process.env.EMPLOYEE_SIGNED_CONTRACT_EMAIL_TEMPLATE,
                sign_completed: process.env.CONTRACT_SIGNING_COMPLETED_EMAIL_TEMPLATE,
            },
            transactions: {
                new_transaction: process.env.TRANS_ALERT_EMAIL_TEMPLATE,
            },
            users: {
                NewInvite: process.env.ACCT_NEW_INVITE_EMAIL_TEMPLATE,
                EmailConfirmation: process.env.CONFIRM_EMAIL_TEMPLATE,
                PasswordReset: process.env.PASSWORD_RESET_EMAIL_TEMPLATE,
                PasswordResetSuccess: process.env.PASSWORD_RESET_SUCCESS_EMAIL_TEMPLATE,
            },
            team: {
                NewMemberInvite: process.env.NEW_TEAM_INVITE_EMAIL_TEMPLATE,
            },
        },
    },
    aws: {
        region: process.env.AMAZON_S3_BUCKET_REGION,
        bucketName: process.env.AMAZON_S3_BUCKET_NAME,
        generalBucketName: process.env.AMAZON_S3_PUBLIC_BUCKET_NAME,
        accessKeyId: process.env.AMAZON_S3_ACCESS_KEY_ID,
        secretAccessKey: process.env.AMAZON_S3_SECRET_ACCESS_KEY,
        salaryProcessorQueue: process.env.AWS_SALARY_PROCESS_QUEUE,
        transEmailQueue: process.env.TRANS_EMAIL_QUEUE_URL,
        importContractQueue: process.env.IMPORT_CONTRACT_QUEUE_URL,
    },
    plaid: {
        client_id: process.env.PLAID_CLIENT_ID,
        secret: process.env.PLAID_SECRET,
        env: process.env.PLAID_ENV,
    },
    stripe: {
        secretKey: process.env.STRIPE_SECRET,
        physicalCardLocations: process.env.PHYSICAL_CARD_AVAILABLE_LOCATION,
    },
    paystack: {
        secretKey: process.env.PAYSTACK_SECRET_KEY,
    },
    veriffPublicKey: process.env.VERIFF_API_KEY,
    encryptionKey: process.env.ENCRYPTION_KEY,
    encryptionKey2: process.env.ENCRYPTION_KEY2,
    frontend: {
        base: process.env.FRONTEND_APP || 'https://staging.app.raenest.com/',
        contractSigning: 'contracts/signing?rntk=',
        contracts: 'contracts',
        transactions: 'transactions',
    },
};