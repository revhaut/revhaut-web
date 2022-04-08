const faker = require('@faker-js/faker');
const { v4: uuidv4 } = require('uuid');

const fakeUsers = ['59ad23dd-e151-4d4e-a054-154d79845793', '7d128792-4598-4187-a14c-0cb714651838', 'e067283a-1c32-4183-be7d-13c1241c41ce', '8a2614f9-ba6b-4024-b1b4-dc5238ba9b75', ...Array(10)].map(
  userId => {
    return {
      id: userId ? userId : uuidv4(),
      first_name: faker.default.name.firstName(),
      last_name: faker.default.name.lastName(),
      email: faker.default.internet.email(),
      phone: faker.default.phone.phoneNumber(),
      password: '$2b$10$7K49Pv4YQE4u03a6ykn5sOUKleegdPbkU2MrfxkuJzeQAyOOvcT6m',
      email_confirm: true,
      allow_attempt: 4,
      user_type: ['admin', 'affiliate', 'vendor'][Math.floor(Math.random() * (2 - 1 + 1)) + 0], //2 is max 0 is min
      state: 'Lagos',
      country: 'Nigeria',
      status: true,
      created_at: new Date(),
      updated_at: new Date(),
    };
  }
);

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  // await knex('users').del();
  // /** */
  // await knex('users').insert(fakeUsers);
};
