require('dotenv').config();
module.exports = {
    development: {
        client: 'pg',
        connection: {
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            database: process.env.DB_DATABASE,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            ssl: true,
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            directory: './src/database/migrations',
        },
        seeds: {
            directory: './src/database/seeds',
        },
    },
};