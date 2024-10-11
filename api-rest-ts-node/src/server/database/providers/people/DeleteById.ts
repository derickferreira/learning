// knex
import { Knex } from "../../knex";

// Table Names
import { ETableNames } from "../../ETableNames";

// Models
import { IPeople } from "../../models";

export const DeleteById = async (id: number): Promise<Number | Error> => {
    try {
        const result = await Knex(ETableNames.people)
            .where("id","=", id)
            .del();

        if (result) return result;

        return new Error("The registry was not found");
    } catch (error) {
        return new Error("Registration faild:" + error);
    }
};
