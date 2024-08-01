import { Request, Response } from "express";

// http-status-code
import { StatusCodes } from "http-status-codes";

// yup
import * as yup from "yup";
import { validation } from "../../shared/middleware";

interface ICity {
    name: string;
}

export const createValidation = validation((getSchema) => ({
    body: getSchema<ICity>(
        yup.object().shape({
            name: yup.string().required().min(3),
        })
    ),
}));
 
export const create = async (
    request: Request<{}, {}, ICity>,
    response: Response
) => {
    console.log(request.body);

    return response
        .status(StatusCodes.CREATED)
        .send("Not Implemented");
};
