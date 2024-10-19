import { Request, Response } from "express";

// http-status-code
import { StatusCodes } from "http-status-codes";

// providers
import { usersProvider } from "../../database/providers/users";

// yup
import * as yup from "yup";
import { validation } from "../../shared/middleware";

interface IBodyProps {
    email: string;
}

export const getEmailValidation = validation((get) => ({
    body: get<IBodyProps>(
        yup.object().shape({
            email: yup.string().required().email(),
        })
    ),
}));

export const getByEmail = async (
    request: Request<{}, {}, IBodyProps>,
    response: Response
) => {
    const result = await usersProvider.getByEmail(request.body.email);

    if (result instanceof Error) {
        return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: {
                default: result.message,
            },
        });
    }

    return response.status(StatusCodes.OK).json(result);
};
