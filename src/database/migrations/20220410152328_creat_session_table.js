/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('sessions', function(table) {
        table.uuid('sid').unique().notNullable().defaultTo(knex.raw('gen_random_uuid()')).primary({
            constraintName: `sessions_id`,
        });
        table.json('sess').notNull();
        table.timestamp('expired').index('sessions_expired_index');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('sessions');
};