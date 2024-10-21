import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { JWTService } from "./JWTService";

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

    const [type, token] = authorization.split(" ");

    if (type !== "Bearer") {
        return response.status(StatusCodes.UNAUTHORIZED).json({
            errors: {
                default: "You must be authenticated to access this resource",
            },
        });
    }

    const jwtData = JWTService.verify(token);

    if (jwtData === "JWT_SECRET_NOT_FOUND") {
        return response.status(StatusCodes.UNAUTHORIZED).json({
            errors: {
                default: "Error verifying the token",
            },
        });
    } else if (jwtData === "INVALID_TOKEN") {
        return response.status(StatusCodes.UNAUTHORIZED).json({
            errors: {
                default: "Invalid token, not authenticated",
            },
        });
    }

    console.log(authorization);
    console.log(jwtData);

    request.headers.iDUser = jwtData.uid.toString();

    return next();
};
