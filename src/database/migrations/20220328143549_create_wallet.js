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
        table.boolean('security_2fa').defaultTo(false);
        table.boolean('language_default').defaultTo('en');
        table.boolean('payment_autopay').defaultTo(false);
        table.string('payment_fund_source').notNull(); //fiat,usdt
        table.string('payment_method'); //wallet,bank
        table.string('currency').notNull();
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