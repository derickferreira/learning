import { testServer } from "../jest.setup";
import { StatusCodes } from "http-status-codes";

describe("People - Create", () => {
    it("Create Register", async () => {
        const res1 = await testServer
            .post("/people")
            .set("Authorization", "Bearer test.test.test")
            .send({
                email: "test@example.com",
                forename: "Test",
                surname: "Random",
                citieId: 1,
            });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);
        expect(typeof res1.body).toEqual("number");
    });

    it("Trying to create a new person with the same email", async () => {
        const res1 = await testServer
            .post("/people")
            .set("Authorization", "Bearer test.test.test")
            .send({
                email: "test@example.com",
                forename: "Test",
                surname: "Random",
                citieId: 1,
            });

        const res2 = await testServer
            .post("/people")
            .set("Authorization", "Bearer test.test.test")
            .send({
                email: "test@example.com",
                forename: "Test",
                surname: "Random",
                citieId: 1,
            });

        expect(res2.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res2.body).toHaveProperty("errors");
    });
});
