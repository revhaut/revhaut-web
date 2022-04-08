const { v4: uuidv4 } = require('uuid');
const faker = require('@faker-js/faker');

const fakerCategories = [
  {
    id: '23c82175-353c-41bc-abf2-d04cc86fd6e1',
    name: 'Food',
    description: 'lorem ipsum dolor, et met',
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: '40e8e92b-e156-46b4-b7f8-0291f371c59a',
    name: 'Car',
    description: 'lorem ipsum dolor, et met',
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: 'cd1c8546-73b2-4d82-aedc-3da2e00fa6ef',
    name: 'House',
    description: 'lorem ipsum dolor, et met',
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: '8a0d1d50-d477-4aff-a1af-12007d554e15',
    name: 'Technology',
    description: 'lorem ipsum dolor, et met',
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: '14dfa44d-8e26-432f-a1d6-d6888e2f1aed',
    name: 'Music',
    description: 'lorem ipsum dolor, et met',
    created_at: new Date(),
    updated_at: new Date(),
  },
];

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // // Deletes ALL existing entries
  // await knex('categories').del();
  // await knex('categories').insert(fakerCategories.map(category => category));
};
