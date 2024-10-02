import { Request, Response } from "express";

// statusCode
import { StatusCodes } from "http-status-codes";

// yup
import * as yup from "yup";

// middleware
import { validation } from "../../shared/middleware";

//  interface from database/models
import { ICity } from "../../database/models";

// providers
import { CitiesProvider } from "../../database/providers/cities";

interface IParamsProps {
    id?: number;
}

interface IBodyProps extends Omit<ICity, "id"> {}

export const updateByIdValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(
        yup.object().shape({
            name: yup.string().required().min(3),
        })
    ),
    params: getSchema<IParamsProps>(
        yup.object().shape({
            id: yup.number().required().positive().integer().moreThan(0),
        })
    ),
}));

export const updateById = async (
    request: Request<IParamsProps, {}, IBodyProps>,
    response: Response
) => {
    if (!request.params.id) {
        return response.status(StatusCodes.BAD_REQUEST).json({
            errors: {
                default: "The ID parameter must be provided",
            },
        });
    }

    const result = await CitiesProvider.updateById(
        request.params.id,
        request.body
    );

    if (result instanceof Error) {
        return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message,
            },
        });
    }

    return response.status(StatusCodes.NO_CONTENT).json(result);
};
