import { Knex } from "../../knex";
import { ETableNames } from "../../ETableNames";

import { IPeople } from "../../models";

export const UpdateById = async (
    id: number,
    people: Omit<IPeople, "id">
): Promise<void | Error> => {
    try {
        const [{ count }] = await Knex(ETableNames.city)
            .where("id", "=", people.citieId)
            .count<[{ count: number }]>("* as count");

        if (count === 0) {
            return new Error("City not found");
        }

        const result = await Knex(ETableNames.people)
            .update(people)
            .where("id", "=", id);

        if (result > 0) return;

        return new Error("Registration error");
    } catch (error) {
        console.log(error);
        return new Error("Registration error");
    }
};
