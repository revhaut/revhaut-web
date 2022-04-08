/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('transactions', function (table) {
    table.uuid('id').unique().notNullable().defaultTo(knex.raw('gen_random_uuid()')).primary({
      constraintName: `transactions_id`,
    });
    table.string('transaction_ref_id').notNull();
    table.integer('amount').notNullable();
    table.integer('commission').notNullable();
    table.string('status').notNullable();
    table.uuid('vendor_id').notNullable();
    table.uuid('product_id').notNullable();
    table.foreign('product_id').references('id').inTable('products');
    table.foreign('vendor_id').references('id').inTable('users');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('transactions');
};
