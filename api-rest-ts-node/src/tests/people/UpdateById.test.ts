import { testServer } from "../jest.setup";
import { StatusCodes } from "http-status-codes";

describe("People - UpdateById", () => {
    it("Update a person by Id", async () => {
        const res1 = await testServer.post("/people").send({
            email: "test@example.com",
            forename: "Test",
            surname: "Random",
            citieId: 1,
        });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);

        const updateRes = await testServer.put("/people/1").send({
            email: "Changingtest@example.com",
            forename: "Test",
            surname: "Random",
            citieId: 1,
        });

        expect(updateRes.statusCode).toEqual(StatusCodes.NO_CONTENT);
    });

    it("Update a register with a id less than 1", async () => {
        const res1 = await testServer.post("/people").send({
            email: "test@example.com",
            forename: "Test",
            surname: "Random",
            citieId: 1,
        });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);

        const updateRes = await testServer.put("/people/0").send({
            email: "Changingtest@example.com",
            forename: "Test",
            surname: "Random",
            citieId: 1,
        });

        expect(updateRes.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    });
});
