import { testServer } from "../jest.setup";
import { StatusCodes } from "http-status-codes";

describe("Cities - UpdateById", () => {
    it("Update a register by id", async () => {
        const res1 = await testServer
            .put("/cities/1")
            .send({ name: "Leighton Buzard" });

        expect(res1.statusCode).toEqual(StatusCodes.OK);
        expect(typeof res1.body).toEqual("object");
    });

    it("Update a register with a id less than 1", async () => {
        const res2 = await testServer.put("/cities/0");

        expect(res2.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res2.body).toHaveProperty("errors.params.id");
    });

    it("update a register by id that does not exist", async () => {
        const res3 = await testServer.put("/cities/9999999").send();

        expect(res3.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    });
});
