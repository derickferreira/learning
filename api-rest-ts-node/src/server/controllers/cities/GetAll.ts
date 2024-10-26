import { Request, RequestHandler, Response } from "express";

// http-status-code
import { StatusCodes } from "http-status-codes";

// yup
import * as yup from "yup";
import { validation } from "../../shared/middleware";

// CitiesProvider
import { CitiesProvider } from "../../database/providers/cities";

interface IQueryProps {
    id?: number;
    page?: number;
    limit?: number;
    filter?: string;
}

export const getAllQueryValidation = validation((getSchema) => ({
    query: getSchema<IQueryProps>(
        yup.object().shape({
            id: yup.number().notRequired().nonNullable().moreThan(0),
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
    const result = await CitiesProvider.getAll(
        request.query.page || 1,
        request.query.limit || 7,
        request.query.filter || "",
        Number(request.query.id || 0)
    );
    const count = await CitiesProvider.count(request.query.filter);

    if (result instanceof Error) {
        return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message,
            },
        });
    }
    if (count instanceof Error) {
        return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: count.message,
            },
        });
    }

    response.setHeader("access-control-expose-headers", "x-total-count");
    response.setHeader("x-total-count", count);

    return response.status(StatusCodes.OK).json(result);
};
