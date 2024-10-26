import { testServer } from "../jest.setup";
import { StatusCodes } from "http-status-codes";

describe("Cities - Create", () => {
    let accessToken = "";
    beforeAll(async () => {
        const email = "create-cities@gmail.com";
        await testServer
            .post("/signUp")
            .send({ name: "Test", email, password: "123456789" });
        const signInRes = await testServer
            .post("/signIn")
            .send({ email, password: "123456789" });

        accessToken = signInRes.body.accessToken;
    });

    it("Create Register without access token", async () => {
        const res1 = await testServer.post("/cities").send({
            name: "Leighton Buzzard",
        });

        expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    });

    it("Create Register", async () => {
        const res1 = await testServer
            .post("/cities")
            .set("Authorization", `Bearer ${accessToken}`)
            .send({
                name: "Leighton Buzzard",
            });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);
        expect(typeof res1.body).toEqual("number");
    });

    it("Trying to Create a Register with a short name", async () => {
        const res1 = await testServer
            .post("/cities")
            .set("Authorization", `Bearer ${accessToken}`)
            .send({
                name: "Le",
            });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty("errors");
    });
});
