import { testServer } from "../jest.setup";
import { StatusCodes } from "http-status-codes";

describe("People - GetAll", () => {
    it("Get All Register", async () => {
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

        const getRes = await testServer
            .get("/people")
            .set("Authorization", "Bearer test.test.test")
            .send();

        expect(Number(getRes.header["x-total-count"])).toBeGreaterThan(0);
        expect(getRes.statusCode).toEqual(StatusCodes.OK);
        expect(getRes.body.length).toBeGreaterThan(0);
    });
});
