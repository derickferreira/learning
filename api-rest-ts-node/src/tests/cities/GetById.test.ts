import { testServer } from "../jest.setup";
import { StatusCodes } from "http-status-codes";

describe("Cities - GetById", () => {
    let accessToken: string;
    beforeAll(async () => {
        const email = "getbui-email@gmail.com";
        await testServer
            .post("/signUp")
            .send({ name: "test", email, password: "123456789" });
        const signInRes = await testServer
            .post("/signIn")
            .send({ email, password: "123456789" });

        accessToken = await signInRes.body.accessToken;
    });
    it("Get a register by id", async () => {
        const res1 = await testServer
            .post("/cities")
            .set("Authorization", `Bearer ${accessToken}`)
            .send({ name: "Rio de Janeiro" });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);

        const getRes = await testServer
            .get(`/cities/${res1.body}`)
            .set("Authorization", `Bearer ${accessToken}`)
            .send();

        expect(getRes.statusCode).toEqual(StatusCodes.OK);
        expect(getRes.body).toHaveProperty("name");
    });

    it("Get a register with a id less than 1", async () => {
        const res1 = await testServer
            .get("/cities/0")
            .set("Authorization", `Bearer ${accessToken}`);

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty("errors.params.id");
    });
});
