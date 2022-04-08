const faker = require('@faker-js/faker');
const { v4: uuidv4 } = require('uuid');

const fakeTransactions = [...Array(15)].map(() => {
  return {
    id: uuidv4(),
    transaction_ref_id: `RUBRW${faker.default.random.word(3)}`,
    amount: Number(faker.default.commerce.price(10000, 90000)),
    commission: Number(faker.default.commerce.price(1000, 9000)),
    status: ['pending', 'completed', 'rejected'][Math.floor(Math.random() * (3 - 1 + 1)) + 0],
    product_id: [
      '5c303e9e-d3e9-4972-9c72-58b4a9713423',
      '09559993-f4d6-47e8-a737-54ba15d9ff24',
      '8871397f-41f4-4e1c-b9d0-28f65bdd6760',
      '551141e2-1108-492b-9352-656970c18522',
      '718b0c56-e3d2-44ce-9fa0-4987af224b17',
    ][Math.floor(Math.random() * (2 - 0 + 1)) + 0],
    vendor_id: ['59ad23dd-e151-4d4e-a054-154d79845793', '7d128792-4598-4187-a14c-0cb714651838', 'e067283a-1c32-4183-be7d-13c1241c41ce', '8a2614f9-ba6b-4024-b1b4-dc5238ba9b75'][
      Math.floor(Math.random() * (2 - 0 + 1)) + 0
    ],
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
  await knex('transactions').del();
  await knex('transactions').insert(fakeTransactions);
};
