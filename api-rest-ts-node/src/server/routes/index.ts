import { Router } from "express";
import { StatusCodes } from "http-status-codes";

// controllers
import { CitiesController } from "./../controllers";
import { PeopleController } from "./../controllers";
import { UsersController } from "./../controllers/users";

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

router.put(
    "/people/:id",
    PeopleController.updateByIdValidation,
    PeopleController.UpdateById
);

// users
router.get(
    "/users",
    UsersController.getEmailValidation,
    UsersController.getByEmail
);

router.post(
    "/users",
    UsersController.createUserValidation,
    UsersController.create
);

export { router };
