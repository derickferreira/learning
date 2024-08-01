import { Request, Response } from "express";

// statusCode
import { StatusCodes } from "http-status-codes";

// yup
import * as yup from "yup";

// middleware
import { validation } from "../../shared/middleware";

interface IParamsProps {
    id?: number;
}

interface IBodyProps {
    name: string;
}

export const updateByIdValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(
        yup.object().shape({
            name: yup.string().required().min(3),
        })
    ),
    params: getSchema<IParamsProps>(
        yup.object().shape({
            id: yup.number().required().positive().integer().moreThan(0),
        })
    ),
}));

export const updateById = async (
    request: Request<IParamsProps, {}, IBodyProps>,
    response: Response
) => {
    console.log(request.params);
    console.log(request.body);

    return response
        .status(StatusCodes.OK)
        .send("Not Implemented");
};
