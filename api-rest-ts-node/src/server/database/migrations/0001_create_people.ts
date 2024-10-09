import type { Knex } from "knex";
import { ETableNames } from "../ETableNames";

export async function up(knex: Knex) {
    return knex.schema
        .createTable(ETableNames.people, (table) => {
            table.bigIncrements("id").primary().index();
            
            table
                .bigInteger("citieId")
                .index()
                .notNullable()
                .references("id")
                .inTable(ETableNames.city)
                .onUpdate("CASCADE")
                .onDelete("RESTRICT");

            table
                .string("forename", 30)
                .checkLength("<=", 30)
                .index()
                .notNullable();

            table
                .string("surname", 30)
                .checkLength("<=", 30)
                .index()
                .notNullable();

            table
                .string("email", 100)
                .checkLength("<=", 100)
                .index()
                .unique()
                .notNullable();

            table.comment("This table is used to store poeple in the system.");
        })
        .then(() => {
            console.log(`# Created table ${ETableNames.people}`);
        });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable(ETableNames.people).then(() => {
        console.log(`# Down table ${ETableNames.people}`);
    });
}
