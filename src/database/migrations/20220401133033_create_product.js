/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('products', function (table) {
    table.uuid('id').unique().notNullable().defaultTo(knex.raw('gen_random_uuid()')).primary({
      constraintName: `products_id`,
    });
    table.string('name').notNull();
    table.string('description').notNull();
    table.string('product_url').notNull();
    table.string('default_access_email').notNull();
    table.string('default_password').notNull();
    table.integer('percentage').notNull();
    table.decimal('product_amount');
    // table.uuid('category_id').notNull();
    // table.uuid('vendor_id').notNull();
    table.string('product_ref').notNull();
    table.string('product_slug').notNull();
    table.boolean('is_publish').defaultTo(false);
    table.boolean('is_deleted').defaultTo(false);
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    // table.foreign('category_id').references('categories.id').inTable('categories');
    table.uuid('category_id').references('id').inTable('categories');
    // table.foreign('vendor_id').references('users.id');
    table.uuid('vendor_id').references('id').inTable('users');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('products');
};
