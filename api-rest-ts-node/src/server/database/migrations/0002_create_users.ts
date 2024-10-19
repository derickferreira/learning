import type { Knex } from "knex";
import { ETableNames } from "../ETableNames";

export async function up(knex: Knex) {
    return knex.schema
        .createTable(ETableNames.user, (table) => {
            table.bigIncrements("id").primary().index();

            table
                .string("name", 30)
                .checkLength("<=", 30)
                .notNullable()
                .checkLength(">=", 3);

            table
                .string("email", 100)
                .checkLength("<=", 100)
                .index()
                .unique()
                .notNullable();

            table.string("password", 100).checkLength(">=", 5);

            table.comment("This table is used to store users in the system.");
        })
        .then(() => {
            console.log(`# Created table ${ETableNames.user}`);
        });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable(ETableNames.user).then(() => {
        console.log(`# Down table ${ETableNames.user}`);
    });
}
