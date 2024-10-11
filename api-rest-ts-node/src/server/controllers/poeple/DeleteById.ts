// express HTTP
import { Request, Response } from "express";

// models
import { IPeople } from "./../../database/models/";

// interface IBodyProps extends Omit
interface IParamsProps {
    id?: number;
}

// yup
import * as yup from "yup";
import { validation } from "../../shared/middleware";

// yup settings

export const deleteByIdValidation = validation((getSchema) => ({
    params: getSchema<IParamsProps>(
        yup.object().shape({
            id: yup.number().required().positive().integer().moreThan(0),
        })
    ),
}));

// providers
import { PeopleProvider } from "../../database/providers/people";

// StatusCode
import { StatusCodes } from "http-status-codes";

export const DeleteById = async (
    request: Request<IParamsProps>,
    response: Response
) => {
    if (!request.params.id) {
        return response.status(StatusCodes.BAD_REQUEST).json({
            errors: {
                default: "The ID must be provided",
            },
        });
    }

    const result = await PeopleProvider.DeleteById(request.params.id);

    if (result instanceof Error) {
        return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message,
            },
        });
    }

    return response.status(StatusCodes.NO_CONTENT).send("deleted");
};
