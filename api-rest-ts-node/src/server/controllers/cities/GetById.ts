import { Response, Request } from "express";

// https-status-code
import { StatusCodes } from "http-status-codes";

// yup
import * as yup from "yup";
import { validation } from "../../shared/middleware";

// providers
import { CitiesProvider } from "../../database/providers/cities";

interface IParamsProps {
    id?: number;
}

export const getByIdQueryValidation = validation((getSchema) => ({
    params: getSchema<IParamsProps>(
        yup.object().shape({
            id: yup.number().required().positive().integer().moreThan(0),
        })
    ),
}));

export const getById = async (
    request: Request,
    response: Response
) => {
    if(!request.params.id) {
        return response.status(StatusCodes.BAD_REQUEST).json
    }

    const citie = await CitiesProvider.getById(+request.params.id);

    return response.status(StatusCodes.OK).json(citie);
};
