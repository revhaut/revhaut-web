const faker = require('@faker-js/faker');
const { v4: uuidv4 } = require('uuid');

const fakeProducts = [
  '5c303e9e-d3e9-4972-9c72-58b4a9713423',
  '09559993-f4d6-47e8-a737-54ba15d9ff24',
  '8871397f-41f4-4e1c-b9d0-28f65bdd6760',
  '551141e2-1108-492b-9352-656970c18522',
  '718b0c56-e3d2-44ce-9fa0-4987af224b17',
  ...Array(10),
].map(productId => {
  return {
    id: productId ? productId : uuidv4(),
    name: faker.default.commerce.product(),
    description: faker.default.commerce.productDescription(),
    product_url: faker.default.image.imageUrl(),
    default_access_email: faker.default.internet.exampleEmail(),
    default_password: '$2b$10$7K49Pv4YQE4u03a6ykn5sOUKleegdPbkU2MrfxkuJzeQAyOOvcT6m',
    percentage: 10,
    product_amount: faker.default.commerce.price(10000, 90000),
    vendor_id: ['59ad23dd-e151-4d4e-a054-154d79845793', '7d128792-4598-4187-a14c-0cb714651838', 'e067283a-1c32-4183-be7d-13c1241c41ce', '8a2614f9-ba6b-4024-b1b4-dc5238ba9b75'][
      Math.floor(Math.random() * (2 - 0 + 1)) + 0
    ], //2 is max 0 is min
    category_id: [
      '23c82175-353c-41bc-abf2-d04cc86fd6e1',
      '40e8e92b-e156-46b4-b7f8-0291f371c59a',
      'cd1c8546-73b2-4d82-aedc-3da2e00fa6ef',
      '8a0d1d50-d477-4aff-a1af-12007d554e15',
      '14dfa44d-8e26-432f-a1d6-d6888e2f1aed',
    ][Math.floor(Math.random() * (3 - 0 + 1)) + 0], //2 is max 0 is min
    product_ref: faker.default.random.word(),
    product_slug: faker.default.internet.url(),
    is_publish: true,
    created_at: new Date(),
    updated_at: new Date(),
  };
});

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  // await knex('products').del();
  // await knex('products').insert(fakeProducts);
};
