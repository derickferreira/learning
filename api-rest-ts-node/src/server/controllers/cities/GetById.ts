import { Response, Request } from "express";

// https-status-code
import { StatusCodes } from "http-status-codes";

// yup
import * as yup from "yup";
import { validation } from "../../shared/middleware";

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
    request: Request<IParamsProps>,
    response: Response
) => {
    request.params;
    return response.status(StatusCodes.OK).json({
        cityName: "Leighton Buzzard",
    });
};

// https://www.youtube.com/watch?v=Hkt_5QGnMw0&list=PL29TaWXah3iaaXDFPgTHiFMBF6wQahurP&index=17
// 5:00
