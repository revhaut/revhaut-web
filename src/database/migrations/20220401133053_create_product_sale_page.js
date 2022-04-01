/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('sale_pages', function(table) {
    table.uuid('id').unique().notNullable().defaultTo(knex.raw('gen_random_uuid()')).primary({
        constraintName: `sale_pages_id`,
    });
    table.string('product_id').notNull();
    table.string('url').notNull();
    table.text('content').notNull();
    table.uuid('vendor_id').notNull();
    table.foreign('product_id').references('id').inTable('products');
    table.boolean('is_publish').defaultTo(false);
    table.boolean('is_deleted').defaultTo(false);
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('sale_pages');
};
