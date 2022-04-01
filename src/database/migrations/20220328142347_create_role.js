/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = function(knex) {
    return knex.schema.createTable('roles', function(table) {
        table.uuid('id').unique().notNullable().defaultTo(knex.raw('gen_random_uuid()')).primary({
            constraintName: `roles_id`,
        });
        table.string('name').notNull();
        table.string('description').notNull();
        table.string('access').notNull();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('roles');
};