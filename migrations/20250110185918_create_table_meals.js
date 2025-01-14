"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
async function up(knex) {
    await knex.schema.createTable('meals', (table) => {
        table.increments('id').primary();
        table
            .integer('user_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('users')
            .onDelete('CASCADE');
        table.text('name').notNullable();
        table.text('description').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable();
    });
}
async function down(knex) {
    await knex.schema.dropTable('meals');
}
