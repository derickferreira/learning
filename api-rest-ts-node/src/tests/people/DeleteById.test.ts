import { testServer } from "../jest.setup";
import { StatusCodes } from "http-status-codes";

describe("People - DeleteById", () => {
    it("Delete Register", async () => {
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

        const deleteRes = await testServer
            .delete("/people/1")
            .set("Authorization", "Bearer test.test.test")
            .send();

        expect(deleteRes.statusCode).toEqual(StatusCodes.NO_CONTENT);
    });

    it("Deleting a register with a id less than 1", async () => {
        const res1 = await testServer
            .delete("/people/0")
            .set("Authorization", "Bearer test.test.test")
            .send();

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    });
});
