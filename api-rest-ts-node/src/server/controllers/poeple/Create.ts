import { Request, Response } from "express";

// http-status-code
import { StatusCodes } from "http-status-codes";

// providers
import { PeopleProvider } from "../../database/providers/people";

export const create = async (request: Request, response: Response) => {
    const result = await PeopleProvider.create(request.body);

    return response.status(StatusCodes.CREATED).json(result);
};
