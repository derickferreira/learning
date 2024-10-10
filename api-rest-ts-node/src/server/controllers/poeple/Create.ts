import { Request, Response } from "express";

// http-status-code
import { StatusCodes } from "http-status-codes";

// providers
import { PeopleProvider } from "../../database/providers/people";

// models
import { IPeople } from "./../../database/models/People";

// yup
import * as yup from "yup";
import { validation } from "../../shared/middleware";

interface IBodyProps extends Omit<IPeople, "id"> {}

export const createValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(
        yup.object().shape({
            email: yup.string().required().email(),
            citieId: yup.number().required().positive().integer().moreThan(0),
            forename: yup.string().required().min(3).max(50),
            surname: yup.string().required().min(3).max(50),
        })
    ),
}));

export const create = async (
    request: Request<{}, {}, IBodyProps>,
    response: Response
) => {
    const result = await PeopleProvider.create(request.body);

    if (result instanceof Error) {
        return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message,
            },
        });
    }

    return response.status(StatusCodes.CREATED).json(result);
};
