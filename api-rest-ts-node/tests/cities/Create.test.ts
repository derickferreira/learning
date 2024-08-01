import { testServer } from "../jest.setup";
import { StatusCodes } from "http-status-codes";

describe("Cities - Create", () => {
    it("Create Register", async () => {
        const res1 = await testServer.post("/cities").send({
            name: "Leighton Buzzard",
        });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);
        expect(typeof res1.body).toEqual("object");
    });

    it("Trying to Create a Register with a short name", async () => {
        const res1 = await testServer.post("/cities").send({
            name: "Le",
        });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty("errors.body.name");
    });
});
