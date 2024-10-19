import { ETableNames } from "../../ETableNames";
import { IUser } from "../../models";
import { Knex } from "../../knex";

export const create = async (
    user: Omit<IUser, "id">
): Promise<number | Error> => {
    const [result] = await Knex(ETableNames.user).insert(user).returning("id");

    if (typeof result === "object") {
        return result.id;
    } else if (typeof result === "number") {
        return result;
    }

    return new Error("Registration failed");
    try {
    } catch (error) {
        console.log(error);
        return new Error("Registration failed ");
    }
};
