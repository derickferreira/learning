import { testServer } from "../jest.setup";
import { StatusCodes } from "http-status-codes";

describe("User - SignIn", () => {
    it("Sign in the user", async () => {
        const res1 = await testServer.post("/signUp").send({
            name: "test",
            email: "test@example.com",
            password: "1234567",
        });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);

        const res2 = await testServer.post("/signIn").send({
            email: "test@example.com",
            password: "1234567",
        });

        expect(res2.statusCode).toEqual(StatusCodes.OK);
    });
});
