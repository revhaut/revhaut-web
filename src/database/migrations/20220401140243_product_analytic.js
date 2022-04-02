/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('product_analytics', function(table) {
    table.uuid('id').unique().notNullable().defaultTo(knex.raw('gen_random_uuid()')).primary({
        constraintName: `sale_pages_id`,
    });
    table.uuid('product_id').notNull();
    table.uuid('user_id').notNull();
    table.uuid('vendor_id').notNull();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    table.foreign('user_id').references('id').inTable('users');
    table.foreign('product_id').references('id').inTable('products');
    table.foreign('vendor_id').references('id').inTable('users');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('product_analytics');
};
