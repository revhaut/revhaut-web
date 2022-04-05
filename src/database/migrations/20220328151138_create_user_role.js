/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = function(knex) {
    return knex.schema.createTable('user_roles', function(table) {
        table.uuid('id').unique().notNullable().defaultTo(knex.raw('gen_random_uuid()')).primary({
            constraintName: `user_roles_id`,
        });
        table.uuid('user_id').notNull();
        table.uuid('role_id').notNull();
        table.foreign('user_id').references('id').inTable('users');
        table.foreign('role_id').references('id').inTable('roles');
        table.dateTime('last_visited').notNull();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('user_roles');
};