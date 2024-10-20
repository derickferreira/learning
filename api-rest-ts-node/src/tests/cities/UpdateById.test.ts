import { testServer } from "../jest.setup";
import { StatusCodes } from "http-status-codes";

describe("Cities - UpdateById", () => {
    it("Update a register by id", async () => {
        const res1 = await testServer
            .post("/cities")
            .set("Authorization", "Bearer test.test.test")
            .send({ name: "Leighton Buzard" });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);

        const updateRes = await testServer
            .put(`/cities/${res1.body}`)
            .set("Authorization", "Bearer test.test.test")
            .send({ name: "Rio de Janeiro" });

        expect(updateRes.statusCode).toEqual(StatusCodes.NO_CONTENT);
    });

    it("Update a register with a id less than 1", async () => {
        const res2 = await testServer
            .put("/cities/0")
            .set("Authorization", "Bearer test.test.test");

        expect(res2.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res2.body).toHaveProperty("errors.params.id");
    });

    it("update a register by id that does not exist", async () => {
        const res3 = await testServer
            .put("/cities/9999999")
            .send()
            .set("Authorization", "Bearer test.test.test");

        expect(res3.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    });
});
