const db = require('../../database');

class ProductResponsitory {
  async create(data) {
    const returnData = ['*'];
    const result = await db('users').insert(data).returning(returnData);
    return result[0];
  }

  findAll() {
    return db.from('products').join('users', 'users.id', 'products.vendor_id').where('products.vendor_id', '59ad23dd-e151-4d4e-a054-154d79845793').select('*');
  }

  //FIXIT: move to category controller later
  getCategories() {
    return db.from('categories').select('*');
  }
}

module.exports = new ProductResponsitory();
