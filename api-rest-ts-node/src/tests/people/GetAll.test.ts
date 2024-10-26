import { testServer } from "../jest.setup";
import { StatusCodes } from "http-status-codes";

describe("People - GetAll", () => {
    let accessToken: string;
    beforeAll(async () => {
        const email = "getall-email@gmail.com";
        await testServer
            .post("/signUp")
            .send({ name: "test", email, password: "123456789" });
        const signInRes = await testServer
            .post("/signIn")
            .send({ email, password: "123456789" });

        accessToken = await signInRes.body.accessToken;
    });

    it("Get All Register", async () => {
        const res1 = await testServer
            .post("/people")
            .set("Authorization", `Bearer ${accessToken}`)
            .send({
                email: "test@example.com",
                forename: "Test",
                surname: "Random",
                citieId: 1,
            });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);

        const getRes = await testServer
            .get("/people")
            .set("Authorization", `Bearer ${accessToken}`)
            .send();

        expect(Number(getRes.header["x-total-count"])).toBeGreaterThan(0);
        expect(getRes.statusCode).toEqual(StatusCodes.OK);
        expect(getRes.body.length).toBeGreaterThan(0);
    });
});
