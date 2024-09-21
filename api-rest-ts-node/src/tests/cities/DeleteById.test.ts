import { testServer } from "../jest.setup";
import { StatusCodes } from "http-status-codes";

describe("Cities - DeleteById", () => {
    it("Delete a register by id", async () => {
        const res1 = await testServer
            .post("/cities")
            .send({ name: "Leighton Buzard" });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);

        const deletedRes = await testServer
            .delete(`/cities/1`)
            .send();

        expect(deletedRes.statusCode).toEqual(StatusCodes.NO_CONTENT);
    });

    it("Deleting a register with a id less than 1", async () => {
        const res2 = await testServer.delete("/cities/0").send();

        expect(res2.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res2.body).toHaveProperty("errors.params.id");
    });
});

// https://www.youtube.com/watch?v=fsAR3dPBOg0&list=PL29TaWXah3iaaXDFPgTHiFMBF6wQahurP&index=19
