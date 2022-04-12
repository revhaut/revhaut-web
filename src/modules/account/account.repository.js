const db = require('../../database');
class AccountRespository {
    async create(data) {
        const returnData = ['*'];
        const result = await db('users').insert(data).returning(returnData);
        return result[0];
    }
    async findUnique(requestdData) {
        return await db('users').first(['*']).where(requestdData);
    }
    async update(id, data) {
        return await db('users').where(id).update(data);
    }
    async remove(id, data) {
        return await db('users').where(id).update(data);
    }
}
module.exports = new AccountRespository();