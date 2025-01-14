"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
async function up(knex) {
    await knex.schema.alterTable('meals', (table) => {
        table.boolean('is_on_diet').defaultTo(false).notNullable();
    });
}
async function down(knex) {
    await knex.schema.alterTable('meals', (table) => {
        table.dropColumn('is_on_diet');
    });
}
