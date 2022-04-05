const db = require('../../database');

class WalletRepository {
    async create(data) {
        const returnData = ['*'];
        const result = await db('wallets').insert(data).returning(returnData);
        return result[0];
    }
    async findFirst(requestdData) {
        return await db('wallets').first(['*']).where(requestdData);
    }
    async update(id, data) {
        return await db('wallets').where(id).update(data);
    }
    async fetchAll(data) {
        return await db('wallets').where(id).update(data);
    }
}

module.exports = new WalletRepository();