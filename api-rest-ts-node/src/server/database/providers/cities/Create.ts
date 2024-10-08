import { Knex } from "../../knex";
import { ETableNames } from "../../ETableNames";
//  interface from database/models
import { ICity } from "../../models";

export const create = async (
    city: Omit<ICity, "id">
): Promise<number | Error> => {
    try {
        const [result] = await Knex(ETableNames.city)
            .insert(city)
            .returning("id");

        if (typeof result === "object") {
            return result.id;
        } else if (typeof result === "number") {
            return result;
        }

        return new Error("Registration error");
    } catch (error) {
        console.error(error);

        return new Error("Registration error");
    }
};
