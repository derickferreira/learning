import { Router } from "express";
import { StatusCodes } from "http-status-codes";

// controllers
import { CitiesController } from "./../controllers";
import { PeopleController } from "./../controllers";
import { UsersController } from "./../controllers/users";
import { ensureAuthenticated } from "../shared/middleware";

const router = Router();

router.get("/", (request, response) => {
    return response.status(StatusCodes.OK).send("Cities");
});

router.get(
    "/cities",
    ensureAuthenticated,
    CitiesController.getAllQueryValidation,
    CitiesController.getAll
);

router.post(
    "/cities",
    ensureAuthenticated,
    CitiesController.createValidation,
    CitiesController.create
);

router.get(
    "/cities/:id",
    ensureAuthenticated,
    CitiesController.getByIdQueryValidation,
    CitiesController.getById
);

router.put(
    "/cities/:id",
    ensureAuthenticated,
    CitiesController.updateByIdValidation,
    CitiesController.updateById
);

router.delete(
    "/cities/:id",
    ensureAuthenticated,
    CitiesController.deleteValidation,
    CitiesController.deleteById
);

// people
router.get(
    "/people",
    ensureAuthenticated,
    PeopleController.getAllValidation,
    PeopleController.GetAll
);

router.post(
    "/people",
    ensureAuthenticated,
    PeopleController.createValidation,
    PeopleController.create
);

router.get(
    "/people/:id",
    ensureAuthenticated,
    PeopleController.getByIdValidation,
    PeopleController.GetById
);

router.delete(
    "/people/:id",
    ensureAuthenticated,
    PeopleController.deleteByIdValidation,
    PeopleController.DeleteById
);

router.put(
    "/people/:id",
    ensureAuthenticated,
    PeopleController.updateByIdValidation,
    PeopleController.UpdateById
);

// users
router.post(
    "/signUp",
    UsersController.signUpValidation,
    UsersController.signUp
);
router.post(
    "/signIn",
    UsersController.signInValidation,
    UsersController.signIn
);

export { router };
