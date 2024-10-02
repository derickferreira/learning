import { Request, Response } from "express";
// status Code
import { StatusCodes } from "http-status-codes";
// yup
import * as yup from "yup";

// middleware
import { validation } from "../../shared/middleware";

// providers
import { CitiesProvider } from "../../database/providers/cities";

// interfaces
interface IParamsProps {
    id?: number;
}

export const deleteValidation = validation((getSchema) => ({
    params: getSchema<IParamsProps>(
        yup.object().shape({
            id: yup.number().required().positive().integer().moreThan(0),
        })
    ),
}));

export const deleteById = async (
    request: Request<IParamsProps>,
    response: Response
) => {
    if (!request.params.id) {
        return response.status(StatusCodes.BAD_REQUEST).json({
            errors: {
                default: "The ID parameter must be provided",
            },
        });
    }

    const result = await CitiesProvider.deleteById(request.params.id);

    if (result instanceof Error) {
        return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: {
                default: result.message,
            },
        });
    }

    return response.status(StatusCodes.NO_CONTENT).send();
};
