import { testServer } from "../jest.setup";
import { StatusCodes } from "http-status-codes";

describe("Cities - GetAll", () => {
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

    it("Get All Registers", async () => {
        const res1 = await testServer
            .post("/cities")
            .set("Authorization", `Bearer ${accessToken}`)
            .send({ name: "Leighton Buzzard" });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);

        const resGot = await testServer
            .get("/cities")
            .set("Authorization", `Bearer ${accessToken}`)
            .send();

        expect(Number(resGot.header["x-total-count"])).toBeGreaterThan(0);
        expect(resGot.statusCode).toEqual(StatusCodes.OK);
        expect(resGot.body.length).toBeGreaterThan(0);
    });
});
