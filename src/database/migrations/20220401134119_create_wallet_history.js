/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('wallet_histories', function(table) {
    table.uuid('id').unique().notNullable().defaultTo(knex.raw('gen_random_uuid()')).primary({
        constraintName: `wallet_histories_id`,
    });
    table.string('user_id').notNull();
    table.string('wallet_id').notNull();
    table.string('transaction_type').notNull();
    table.decimal('amount').notNull();
    table.string('channel').notNull();
    table.string('designated_account').notNull();
    table.string('status').notNull();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    table.foreign('product_id').references('id').inTable('products');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('sale_pages');
};
