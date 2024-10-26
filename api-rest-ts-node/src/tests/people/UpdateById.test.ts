import { testServer } from "../jest.setup";
import { StatusCodes } from "http-status-codes";

describe("People - UpdateById", () => {
    let accessToken: string;
    beforeAll(async () => {
        const email = "deletebui-email@gmail.com";
        await testServer
            .post("/signUp")
            .send({ name: "test", email, password: "123456789" });
        const signInRes = await testServer
            .post("/signIn")
            .send({ email, password: "123456789" });

        accessToken = await signInRes.body.accessToken;
    });

    it("Update a person by Id", async () => {
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

        const updateRes = await testServer
            .put("/people/1")
            .set("Authorization", `Bearer ${accessToken}`)
            .send({
                email: "Changingtest@example.com",
                forename: "Test",
                surname: "Random",
                citieId: 1,
            });

        expect(updateRes.statusCode).toEqual(StatusCodes.NO_CONTENT);
    });

    it("Update a register with a id less than 1", async () => {
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

        const updateRes = await testServer
            .put("/people/0")
            .set("Authorization", `Bearer ${accessToken}`)
            .send({
                email: "Changingtest@example.com",
                forename: "Test",
                surname: "Random",
                citieId: 1,
            });

        expect(updateRes.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    });
});
