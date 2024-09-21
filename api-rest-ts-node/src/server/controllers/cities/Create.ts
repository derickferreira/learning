import { Request, Response } from "express";

// http-status-code
import { StatusCodes } from "http-status-codes";

// yup
import * as yup from "yup";
import { validation } from "../../shared/middleware";

//  interface from database/models
import { ICity } from "../../database/models";

// providers
import { CitiesProvider } from "../../database/providers/cities";

interface IBodyProps extends Omit<ICity, "id"> {}

export const createValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(
        yup.object().shape({
            name: yup.string().required().min(3).max(150),
        })
    ),
}));

export const create = async (
    request: Request<{}, {}, IBodyProps>,
    response: Response
) => {
    const result = await CitiesProvider.create(request.body);

    if (result instanceof Error) {
        return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message,
            },
        });
    }

    return response.status(StatusCodes.CREATED).json(result);
};
