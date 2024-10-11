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
            email: yup.string().required().email().max(100).nonNullable(),
            citieId: yup
                .number()
                .required()
                .positive()
                .integer()
                .moreThan(0)
                .nonNullable(),
            forename: yup.string().required().max(30).nonNullable(),
            surname: yup.string().required().max(30).nonNullable(),
        })
    ),
}));

export const create = async (
    request: Request<{}, {}, IBodyProps>,
    response: Response
) => {
    const result = await PeopleProvider.create(request.body);
    console.log(result)

    if (result instanceof Error) {
        return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message,
            },
        });
    }

    return response.status(StatusCodes.CREATED).json(result);
};
