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

// people

router.get(
    "/people",
    PeopleController.getAllValidation,
    PeopleController.GetAll
);

router.post(
    "/people",
    PeopleController.createValidation,
    PeopleController.create
);

router.get(
    "/people/:id",
    PeopleController.getByIdValidation,
    PeopleController.GetById
);

router.delete(
    "/people/:id",
    PeopleController.deleteByIdValidation,
    PeopleController.DeleteById
);

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
