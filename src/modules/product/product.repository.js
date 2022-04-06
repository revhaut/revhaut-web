const db = require('../../database');

class ProductResponsitory {
  async create(data) {
    const returnData = ['*'];
    const result = await db('users').insert(data).returning(returnData);
    return result[0];
  }

  findAll() {
    return db.from('products').select('*');
  }

  //FIXIT: move to category controller later
  getCategories() {
    return db.from('categories').select('*');
  }
}

module.exports = new ProductResponsitory();
