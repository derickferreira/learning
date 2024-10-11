// express HTTP
import { Request, Response } from "express";

// models
import { IPeople } from "./../../database/models/";

// interface
interface IQueryProps {
    page?: number;
    limit?: number;
    filter?: string;
}

// yup
import * as yup from "yup";
import { validation } from "../../shared/middleware";

// yup settings

export const getAllValidation = validation((get) => ({
    query: get<IQueryProps>(
        yup.object().shape({
            filter: yup.string().default(""),
            page: yup.number().integer().moreThan(0).default(1),
            limit: yup.number().integer().moreThan(0).default(7),
        })
    ),
}));

// providers
import { PeopleProvider } from "../../database/providers/people";

// StatusCode
import { StatusCodes } from "http-status-codes";

export const GetAll = async (
    request: Request<{}, {}, {}, IQueryProps>,
    response: Response
) => {
    const result = await PeopleProvider.GetAll(
        request.query.page || 1,
        request.query.limit || 7,
        request.query.filter || ""
    );
    const count = await PeopleProvider.Count(request.query.filter)

    if (result instanceof Error )

    return response.status(StatusCodes.NO_CONTENT).send("");
};
