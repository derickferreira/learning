import { Request, Response } from "express";
// status Code
import { StatusCodes } from "http-status-codes";
// yup
import * as yup from "yup";

// middleware
import { validation } from "../../shared/middleware";

// providers
import { CitiesProvider } from "../../database/providers/cities";

// interfaces
interface IParamsProps {
    id?: number;
}

export const deleteValidation = validation((getSchema) => ({
    params: getSchema<IParamsProps>(
        yup.object().shape({
            id: yup.number().required().positive().integer().moreThan(0),
        })
    ),
}));

export const deleteById = (request: Request, response: Response) => {
    CitiesProvider.deleteById(+request.params.id);

    return response.status(StatusCodes.NO_CONTENT).send();
};
