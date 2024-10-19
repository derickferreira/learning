// knex
import { Knex } from "../../knex";

// Table Names
import { ETableNames } from "../../ETableNames";
import { IPeople } from "../../models";

export const GetById = async (id: number): Promise<IPeople | Error> => {
    try {
        const result = await Knex(ETableNames.people)
            .select("*")
            .where("id", "=", id)
            .first();

        if (result) return result;

        return new Error("The registry was not found");
    } catch (error) {
        return new Error("Registration faild:" + error);
    }
};
