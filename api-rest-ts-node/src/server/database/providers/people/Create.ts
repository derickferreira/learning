import { Knex } from "../../knex";
import { ETableNames } from "../../ETableNames";

import { IPeople } from "../../models";

export const create = async (
    people: Omit<IPeople, "id">
): Promise<number | Error> => {
    try {
        const [result] = await Knex(ETableNames.people)
            .insert(people)
            .returning("id");
        console.log(result);
        console.log(people)

        if (typeof result === "object") {
            return result.id;
        } else if (typeof result === "number") result;

        return new Error("Registration error");
    } catch (error) {
        return new Error("Registration error");
    }
};
