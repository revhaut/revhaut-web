const knex = require('../../database');
class AccountRespository {
    async create(data) {
        const duplicate = await this.findOne(data.email);
        if (duplicate) {
            throw new Error('email already exist');
        }
        try {
            const returnData = ['*'];
            const insertedRows = await knex('users').insert(data).returning(returnData);
            return { is_successful: false, data: insertedRows[0] };
        } catch (error) {
            throw new Error('error registring user pleas try again');
        }
    }
    async findOne(email) {
        let result;
        try {
            result = await knex('users').first(['id']).where({ email });
        } catch (error) {
            throw new Error('Incorrect password');
        }
        return result;
    }
    async findAll(data) {
        const { role_id, country_id, page = 1, perPage = 10 } = data;
        const searchCriteria = [{ role_id: { contains: role_id } }, { country_id: { contains: country_id } }];

        const searchResult = await accountRepositoryPagination({
            where: { AND: searchCriteria },
            select: UserEntity.selectEmployeeDetails(),
            page,
            take: perPage,
            model: 'user',
        });
        if (searchResult.records.length === 0) {
            throw new Error('No role found');
        }
        return { accountData: searchResult, message: 'Request Successful' };
    }
    async update() {}
}
module.exports = new AccountRespository();