/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = function(knex) {
    return knex.schema.createTable('users', function(table) {
        table.uuid('id').unique().notNullable().defaultTo(knex.raw('gen_random_uuid()')).primary({
            constraintName: `users_id`,
        });
        table.string('first_name').notNull();
        table.string('last_name').notNull();
        table.string('email').notNull();
        table.string('phone').notNull();
        table.string('password').notNull();
        table.string('revhaut_tag').nullable();
        table.string('referal_code').nullable();
        table.json('addresses').nullable();
        table.string('profile_pic').nullable();
        table.boolean('email_confirm').defaultTo(false);
        table.json('email_token').nullable();
        table.integer('login_attempt').defaultTo(0);
        table.integer('allow_attempt').defaultTo(4);
        table.string('ip').nullable();
        table.string('user_type');
        table.string('state');
        table.string('country');
        table.boolean('status').defaultTo(false);
        table.boolean('is_deleted').defaultTo(false);
        table.dateTime('last_login').nullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
};

// table.increments('id');
// table.string('account_name');
// table.integer('age');
// table.float('age');
// table.decimal('balance', 8, 2);
// table.boolean('is_admin');
// table.date('birthday');
// table.time('created_at');
// table.timestamp('created_at').defaultTo(knex.fn.now());
// table.json('profile');
// table.jsonb('profile');
// table.uuid('id').primary();

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('users');
};