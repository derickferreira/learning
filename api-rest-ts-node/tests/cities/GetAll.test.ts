import { testServer } from "../jest.setup";
import { StatusCodes } from "http-status-codes";

describe("Cities - GetAll", () => {
    it("Get All Registers", async () => {
        const res1 = await testServer.get(
            "/cities?filter=derick&limit=20&page=1"
        );

        expect(res1.statusCode).toEqual(StatusCodes.OK);
        expect(res1.body).toHaveProperty("cities");
    });
    it("Trying to get a register with a number less than 1", async () => {
        const res2 = await testServer.get(
            "/cities?filter=derick&limit=0&page=0"
        );
    });
});
