// knex
import { Knex } from "../../knex";

// Table Names
import { ETableNames } from "../../ETableNames";

// models
import { IPeople } from "../../models";

export const GetAll = async (
    page: number,
    limit: number,
    filter: string
): Promise<IPeople[] | Error> => {
    try {
        const result = await Knex(ETableNames.people)
            .select("*")
            .where("forename", "like", `%${filter}%`)
            .offset((page - 1) * limit)
            .limit(limit);

        if (result.length > 0) return result;

        return new Error("The registry was not found");
    } catch (error) {
        return new Error("Registration faild:" + error);
    }
};
