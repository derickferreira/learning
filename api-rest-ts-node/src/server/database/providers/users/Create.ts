import { ETableNames } from "../../ETableNames";
import { IUser } from "../../models";
import { Knex } from "../../knex";
import { PasswordCrypto } from "../../../shared/services";

export const create = async (
    user: Omit<IUser, "id">
): Promise<number | Error> => {
    const hashedPassword = await PasswordCrypto.hashPassword(user.password);

    const [result] = await Knex(ETableNames.user)
        .insert({ ...user, password: hashedPassword })
        .returning("id");

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
