// express HTTP
import { Request, Response } from "express";

// models
import { IPeople } from "./../../database/models/";

// interface
// yup
import * as yup from "yup";
import { validation } from "../../shared/middleware";

// yup settings

export const updateByIdValidation = validation((get) => ({
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
    request: Request,
    response: Response
) => {


    return response.status(StatusCodes.NO_CONTENT).send("updated");
};
