/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = function(knex) {
    return knex.schema.createTable('withdraw_methods', function(table) {
        table.uuid('id').unique().notNullable().defaultTo(knex.raw('gen_random_uuid()')).primary({
            constraintName: `withdraw_methods_id`,
        });
        table.uuid('user_id').notNull();
        table.foreign('user_id').references('id').inTable('users');
        table.json('address').notNull();
        table.string('channel').notNull();
        table.json('channel_details');
        table.boolean('default').defaultTo(false);
        table.string('currency').notNull();
        table.string('country').notNull();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('withdraw_methods');
};