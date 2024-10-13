import { testServer } from "../jest.setup";
import { StatusCodes } from "http-status-codes";

describe("People - DeleteById", () => {
    it("Delete Register", async () => {
        const res1 = await testServer.post("/people").send({
            email: "test@example.com",
            forename: "Test",
            surname: "Random",
            citieId: 1,
        });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);

        const deleteRes = await testServer.delete("/people/1").send();

        expect(deleteRes.statusCode).toEqual(StatusCodes.NO_CONTENT);
    });

    it("Deleting a register with a id less than 1", async () => {
        const res1 = await testServer.delete("/people/0").send();

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    });
});
