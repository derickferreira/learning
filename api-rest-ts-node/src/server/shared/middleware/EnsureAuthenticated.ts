import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";

export const ensureAuthenticated: RequestHandler = async (
    request,
    response,
    next
) => {
    const { authorization } = request.headers;

    if (!authorization) {
        return response.status(StatusCodes.UNAUTHORIZED).json({
            errors: {
                default: "You must be authenticated to access this resource",
            },
        });
    }

    console.log(authorization);

    const [type, token] = authorization.split(" ");

    if (type !== "Bearer") {
        return response.status(StatusCodes.UNAUTHORIZED).json({
            errors: {
                default: "You must be authenticated to access this resource",
            },
        });
    }

    return next();
};
