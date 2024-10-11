import { Knex } from "../../knex";

import { ICity } from "../../models";
import { ETableNames } from "../../ETableNames";

export const getById = async (id: number): Promise<ICity | Error> => {
    try { 
        const result = await Knex(ETableNames.city)
            .select("*")
            .where("id", "=", id)
            .first();

        if (result) return result;

        return new Error("The registry was not found");
    } catch (error) {
        console.log(error);
        return new Error("Error when querying the registry ");
    }
};
