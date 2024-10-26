import { testServer } from "../jest.setup";
import { StatusCodes } from "http-status-codes";

describe("People - DeleteById", () => {
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

    it("Delete Register", async () => {
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

        const deleteRes = await testServer
            .delete("/people/1")
            .set("Authorization", `Bearer ${accessToken}`)
            .send();

        expect(deleteRes.statusCode).toEqual(StatusCodes.NO_CONTENT);
    });

    it("Deleting a register with a id less than 1", async () => {
        const res1 = await testServer
            .delete("/people/0")
            .set("Authorization", `Bearer ${accessToken}`)
            .send();

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    });
});
