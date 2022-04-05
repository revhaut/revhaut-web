/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('wallet_histories', function(table) {
    table.uuid('id').unique().notNullable().defaultTo(knex.raw('gen_random_uuid()')).primary({
        constraintName: `wallet_histories_id`,
    });
    table.uuid('user_id').notNull();
    table.uuid('wallet_id').notNull();
    table.string('transaction_type').notNull();
    table.decimal('amount').notNull();
    table.string('channel').notNull();
    table.string('designated_account').notNull();
    table.string('status').notNull();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    table.foreign('user_id').references('id').inTable('users');
    table.foreign('wallet_id').references('id').inTable('wallets');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('wallet_histories');
};
