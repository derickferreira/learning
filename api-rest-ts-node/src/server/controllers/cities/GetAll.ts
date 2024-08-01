import { Request, RequestHandler, Response } from "express";

// http-status-code
import { StatusCodes } from "http-status-codes";

// yup
import * as yup from "yup";
import { validation } from "../../shared/middleware";

interface IQueryProps {
    page?: number;
    limit?: number;
    filter?: string;
}

export const getAllQueryValidation = validation((getSchema) => ({
    query: getSchema<IQueryProps>(
        yup.object().shape({
            page: yup.number().notRequired().nonNullable().moreThan(0),
            limit: yup.number().notRequired().nonNullable().moreThan(0),
            filter: yup.string().notRequired().nonNullable(),
        })
    ),
}));

export const getAll = async (
    request: Request<{}, {}, {}, IQueryProps>,
    response: Response
) => {
    console.log(request.query);

    return response.status(StatusCodes.OK).send({
        cities: "All Cities",
    });
};
