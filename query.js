var a = require('./src/database');
var a = require('./src/database');
var db = require('./src/database');
db('products').select('*');

db.from('products').select('*');
db.from('products').select('*');

db.from('products')
  .select('*')
  .then(d => {
    console.log(d);
  })
  .catch(err => console.log(err));

db.from('products')
  .join('users', 'users.id', 'products.vendor_id')
  .select('*')
  .then(d => {
    console.log(d);
  })
  .catch(err => console.log(err));

db.from('products')
  .join('users', 'users.id', 'products.vendor_id')
  .where('id', '8a2614f9-ba6b-4024-b1b4-dc5238ba9b75')
  .select('*')
  .then(d => {
    console.log(d);
  })
  .catch(err => console.log(err));

db.from('products')
  .join('users', 'users.id', 'products.vendor_id')
  .where('products.id', '8a2614f9-ba6b-4024-b1b4-dc5238ba9b75')
  .select('*')
  .then(d => {
    console.log(d);
  })
  .catch(err => console.log(err));

db.from('products')
  .join('users', 'users.id', 'products.vendor_id')
  .where('users.id', '8a2614f9-ba6b-4024-b1b4-dc5238ba9b75')
  .select('*')
  .then(d => {
    console.log(d);
  })
  .catch(err => console.log(err));

db.from('products')
  .join('users', 'users.id', 'products.vendor_id')
  .where('users.id', '8a2614f9-ba6b-4024-b1b4-dc5238ba9b75')
  .select('*')
  .then(d => {
    console.log(d);
  })
  .catch(err => console.log(err));
