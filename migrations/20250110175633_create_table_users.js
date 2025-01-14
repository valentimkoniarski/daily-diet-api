"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
async function up(knex) {
    await knex.schema.createTable('users', (table) => {
        table.increments('id').primary();
        table.text('username').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable();
    });
}
async function down(knex) {
    await knex.schema.dropTable('users');
}
