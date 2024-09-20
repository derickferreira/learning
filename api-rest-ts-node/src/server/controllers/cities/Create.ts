import { Request, Response } from "express";

// http-status-code
import { StatusCodes } from "http-status-codes";

// yup
import * as yup from "yup";
import { validation } from "../../shared/middleware";

// interface from database
import { ICity } from "../../database/models";

interface IBodyProps extends Omit<ICity, "id"> {}

export const createValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(
        yup.object().shape({
            name: yup.string().required().min(3),
        })
    ),
}));

export const create = async (
    request: Request<{}, {}, IBodyProps>,
    response: Response
) => {
    console.log(request.body);

    return response.status(StatusCodes.CREATED).send("Not Implemented");
};
