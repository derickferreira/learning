import { Request, response, Response } from "express";

// http-status-code
import { StatusCodes } from "http-status-codes";

// providers
import { usersProvider } from "../../database/providers/users";

// models
import { IUser } from "./../../database/models/User";

// JWT service
import { JWTService } from "../../shared/middleware/";

// yup
import * as yup from "yup";
import { validation } from "../../shared/middleware";
import { PasswordCrypto } from "../../shared/services";

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

    const passwordMatch = await PasswordCrypto.verifyPassword(
        password,
        result.password
    );

    if (!passwordMatch) {
        return response.status(StatusCodes.UNAUTHORIZED).json({
            errors: {
                default: "Email or password is incorect",
            },
        });
    } else {
        const accessToken = JWTService.sign({ uid: result.id });

        if (accessToken === "JWT_SECRET_NOT_FOUND") {
            return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                errors: {
                    default: "Error generating access token",
                },
            });
        }

        return response.status(StatusCodes.OK).json({ accessToken });
    }
};
