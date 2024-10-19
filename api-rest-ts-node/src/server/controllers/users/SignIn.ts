import { Request, response, Response } from "express";

// http-status-code
import { StatusCodes } from "http-status-codes";

// providers
import { usersProvider } from "../../database/providers/users";

// models
import { IUser } from "./../../database/models/User";

// yup
import * as yup from "yup";
import { validation } from "../../shared/middleware";

interface IBodyProps extends Omit<IUser, "id" | "name"> {}

export const signInValidation = validation((get) => ({
    body: get<IBodyProps>(
        yup.object().shape({
            email: yup.string().required().email().max(100).nonNullable(),
            password: yup.string().required().min(5).max(100),
        })
    ),
}));

export const signIn = async (
    request: Request<{}, {}, IUser>,
    response: Response
) => {
    const { email, password } = request.body;

    const result = await usersProvider.getByEmail(email);

    if (result instanceof Error) {
        return response.status(StatusCodes.UNAUTHORIZED).json({
            errors: {
                default: "Email or password is incorect",
            },
        });
    }

    if (password !== result.password) {
        return response.status(StatusCodes.UNAUTHORIZED).json({
            errors: {
                default: "Email or password is incorect",
            },
        });
    } else {
        return response
            .status(StatusCodes.OK)
            .json({ accessToken: "test.test.test" });
    }
};
