import { testServer } from "../jest.setup";
import { StatusCodes } from "http-status-codes";

describe("Cities - GetById", () => {
    it("Get a register by id", async () => {
        const res1 = await testServer
            .post("/cities")
            .send({ name: "Rio de Janeiro" });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);

        const getRes = await testServer.get(`/cities/${res1.body}`).send();

        expect(getRes.statusCode).toEqual(StatusCodes.OK);
        expect(getRes.body).toHaveProperty("name");
    });

    it("Get a register with a id less than 1", async () => {
        const res1 = await testServer.get("/cities/0");

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty("errors.params.id");
    });
});
