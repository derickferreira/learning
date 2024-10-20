import { testServer } from "../jest.setup";
import { StatusCodes } from "http-status-codes";

describe("People - GetById", () => {
    it("Get a register by id", async () => {
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
        expect(typeof res1.body).toEqual("number");

        const getResId = await testServer
            .get("/people/1")
            .set("Authorization", "Bearer test.test.test")
            .send();

        expect(getResId.statusCode).toEqual(StatusCodes.OK);
        expect(typeof getResId.body).toEqual("object");
    });
});
