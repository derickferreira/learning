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

interface IBodyProps extends Omit<IUser, "id"> {}

export const signUpValidation = validation((get) => ({
    body: get<IBodyProps>(
        yup.object().shape({
            name: yup.string().required().min(3).max(100),
            email: yup.string().required().email().max(100).nonNullable(),
            password: yup.string().required().min(6).max(100),
        })
    ),
}));

export const signUp = async (
    request: Request<{}, {}, IUser>,
    response: Response
) => {
    const result = await usersProvider.create(request.body);

    if (result instanceof Error) {
        return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message,
            },
        });
    }

    return response.status(StatusCodes.CREATED).json(result);
};
