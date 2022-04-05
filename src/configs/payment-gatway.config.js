const paymentConfig = {
    paystack: {
        options: {
            hostname: 'api.paystack.co',
            port: 443,
            path: '/plan',
            method: 'POST',
            headers: {
                Authorization: `Bearer ${process.env.PAYSTACK_API_KEY}`,
                'Content-Type': 'application/json',
            },
        },
    },
    flutterware: {},
};

module.exports = paymentConfig;