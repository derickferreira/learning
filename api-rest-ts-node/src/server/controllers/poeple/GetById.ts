// express HTTP
import { Request, Response } from "express";

// models
import { IPeople } from "./../../database/models/";

// interface IBodyProps extends Omit
interface IBodyProps extends Pick<IPeople, "id"> {}

// yup
import * as yup from "yup";
import { validation } from "../../shared/middleware";

// yup settings

export const getByIdValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(
        yup.object().shape({
            id: yup.number().required().positive().integer().moreThan(0),
        })
    ),
}));

// providers
import { PeopleProvider } from "../../database/providers/people";

// StatusCode
import { StatusCodes } from "http-status-codes";

export const GetById = async (
    request: Request<{}, {}, IBodyProps>,
    response: Response
) => {
    const result = await PeopleProvider.GetAll(request.body.id);

    if (result instanceof Error) {
        return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message,
            },
        });
    }

    return response.status(StatusCodes.OK).json(result);
};
