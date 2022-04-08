const db = require('../../database');

class VendorRepository {
  async vendorDashboardStats(userId) {
    const products = await db
      .from('products')
      .select('*')
      .join('users', 'users.id', 'products.vendor_id')
      .join('transactions', 'products.id', 'transactions.product_id')
      .where('transactions.vendor_id', '59ad23dd-e151-4d4e-a054-154d79845793');
    return products.map(data => {
      return {
        transaction: {
          id: data.id,
          status: data.status,
          amount: data.amount,
          commission: data.commission,
          transaction_ref_id: data.transaction_ref_id,
          product_name: data.name,
        },
        product: {
          id: data.product_id,
          name: data.name,
          amount: data.product_amount,
        },
      };
    });
  }
  async createProduct(data) {
    const returnData = ['*'];
    const result = db('users').insert(data).returning(returnData);
    return result[0];
  }

  async findVendorProducts(userId) {
    return db.from('products').join('users', 'users.id', 'products.vendor_id').where('products.vendor_id', '59ad23dd-e151-4d4e-a054-154d79845793').select('*');
  }

  //FIXIT: move to category controller later
  getCategories() {
    return db.from('categories').select('*');
  }

  //BUG: not  working trying to implement count on products that has the highest transactions
  //   async topSelling(userId) {
  //     const a = await this.vendorDashboardStats();
  //     let b;
  //     for (let index = 0; index < a.length; index++) {
  //       var len = a.length;

  //       var current = a[index];
  //       var previous = a[(index + len - 1) % len];
  //       var next = a[(index + 1) % len];
  //       const element = a[index];
  //       if (previous.product.id === current.product.id) {
  //         console.log(current.product.id);
  //         db('transactions')
  //           .where({ product_id: current.product.id })
  //           .count('transactions.product_id as q')
  //           .then(a => {

  //           });
  //         // b.push({ a: current.product, i:  });
  //       }
  //       if (previous.product.id !== current.product.id) {
  //         b.push(current);
  //       }
  //     }
  //     return b;
  //   }
}

module.exports = new VendorRepository();
