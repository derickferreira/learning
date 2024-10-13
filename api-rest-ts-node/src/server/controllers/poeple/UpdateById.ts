// express HTTP
import { Request, Response } from "express";

// models
import { IPeople } from "./../../database/models/";

// interface
// yup
import * as yup from "yup";
import { validation } from "../../shared/middleware";

// yup settings
interface IParamsProps {
    id?: number;
}

interface IBodyProps extends Omit<IPeople, "id"> {}

export const updateByIdValidation = validation((get) => ({
    body: get<IBodyProps>(
        yup.object().shape({
            email: yup.string().required().email(),
            citieId: yup.number().integer().required(),
            forename: yup.string().required().min(3),
            surname: yup.string().required().min(3),
        })
    ),
    params: get<IParamsProps>(
        yup.object().shape({
            id: yup.number().integer().required().moreThan(0),
        })
    ),
}));

// providers
import { PeopleProvider } from "../../database/providers/people";

// StatusCode
import { StatusCodes } from "http-status-codes";

export const UpdateById = async (
    request: Request<IParamsProps, {}, IBodyProps>,
    response: Response
) => {
    if (!request.params.id) {
        return response.status(StatusCodes.BAD_REQUEST).json({
            errors: {
                default: "The ID must be provided",
            },
        });
    }

    const result = await PeopleProvider.UpdateById(
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
