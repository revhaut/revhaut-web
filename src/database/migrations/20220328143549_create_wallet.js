/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('wallets', function(table) {
        table.uuid('id').unique().notNullable().defaultTo(knex.raw('gen_random_uuid()')).primary({
            constraintName: `wallets_id`,
        });
        table.uuid('user_id').notNull();
        table.foreign('user_id').references('id').inTable('users');
        table.decimal('balance').defaultTo(0.0);
        table.string('type').defaultTo('fiat'); //fiat,usdt
        table.string('currency').notNull();
        table.boolean('is_enabled').defaultTo(true);
        table.boolean('auto_withdraw').defaultTo(false);
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('wallets');
};