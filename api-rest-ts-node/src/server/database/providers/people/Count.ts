import { Knex } from "../../knex";
import { ETableNames } from "../../ETableNames";

import { IPeople } from "../../models";

export const Count = async (filter = ""): Promise<number | Error> => {
    try {
        const [{ count }] = await Knex(ETableNames.people)
            .where("forename", "like", `%${filter}%`)
            .count<[{ count: number }]>("* as count");

        if (Number.isInteger(Number(count))) return Number(count);

        return new Error("Registration error");
    } catch (error) {
        return new Error("Registration error");
    }
};
