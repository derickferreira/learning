// knex
import { Knex } from "../../knex";

// Table Names
import { ETableNames } from "../../ETableNames";

export const DeleteById = async (id: number): Promise<void | Error> => {
    try {
        const result = await Knex(ETableNames.people)
            .where("id", "=", id)
            .del();

        if (result > 0) return;

        return new Error("The registry was not found");
    } catch (error) {
        return new Error("Registration faild:" + error);
    }
};
