import { testServer } from "../jest.setup";
import { StatusCodes } from "http-status-codes";

describe("User - Sign Up", () => {
    it("insert a new user", async () => {
        const res1 = await testServer.post("/signUp").send({
            name: "Random",
            email: "random@gmail.com",
            password: "1234567",
        });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    });
});
