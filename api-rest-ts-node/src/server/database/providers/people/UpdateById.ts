import { Knex } from "../../knex";
import { ETableNames } from "../../ETableNames";

import { IPeople } from "../../models";

export const UpdateById = async (
    id: Omit<IPeople, "id">
): Promise<void | Error> => {
    try {
        const result = await Knex(ETableNames.people)
            .update({ id })
            .where("id", "=", id);

        if (result > 0) return;

        return new Error("Registration error");
    } catch (error) {
        return new Error("Registration error");
    }
};
