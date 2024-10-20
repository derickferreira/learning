import { testServer } from "../jest.setup";
import { StatusCodes } from "http-status-codes";

describe("Cities - GetAll", () => {
    it("Get All Registers", async () => {
        const res1 = await testServer
            .post("/cities")
            .set("Authorization", "Bearer test.test.test")
            .send({ name: "Leighton Buzzard" });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);

        const resGot = await testServer
            .get("/cities")
            .set("Authorization", "Bearer test.test.test")
            .send();

        expect(Number(resGot.header["x-total-count"])).toBeGreaterThan(0);
        expect(resGot.statusCode).toEqual(StatusCodes.OK);
        expect(resGot.body.length).toBeGreaterThan(0);
    });
});
