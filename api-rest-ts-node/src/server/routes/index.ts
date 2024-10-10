import { Router } from "express";
import { StatusCodes } from "http-status-codes";

// controllers
import { CitiesController } from "./../controllers";
import { PeopleController } from "./../controllers";

const router = Router();

router.get("/", (request, response) => {
    return response.status(StatusCodes.OK).send("Cities");
});

router.get(
    "/cities",
    CitiesController.getAllQueryValidation,
    CitiesController.getAll
);

router.post(
    "/cities",
    CitiesController.createValidation,
    CitiesController.create
);

router.get(
    "/cities/:id",
    CitiesController.getByIdQueryValidation,
    CitiesController.getById
);

router.put(
    "/cities/:id",
    CitiesController.updateByIdValidation,
    CitiesController.updateById
);

router.delete(
    "/cities/:id",
    CitiesController.deleteValidation,
    CitiesController.deleteById
);

// cities

router.get("/people", (req, response) => {
    return response.status(StatusCodes.OK).send("Cities");
});

router.post(
    "/people",
    PeopleController.create,
    PeopleController.createValidation
);

router.get("/people/:id", PeopleController.GetById);

export { router };
/*
router.get("/test", (request, response) => {
    // params
    // query
    // cookies
    // localhost:3333/?test=123
    // "test" : "123"
    const dataParam = request.query.test;
    console.log(dataParam);
    // console.log(request.query);
    return response.send("hello mate!");
}); */
