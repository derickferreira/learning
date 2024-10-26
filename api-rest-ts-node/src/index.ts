import { Knex } from "./server/database/knex";
import { server } from "./server/Server";

const startServer = () =>
    server.listen(process.env.PORT || 3333, () =>
        console.log(`app running in the port: ${process.env.PORT}`)
    );

if (process.env.IS_LOCALHOST !== "true") {
    console.log("Imigration is running and seed");

    Knex.migrate
        .latest()
        .then(() => {
            Knex.seed
                .run()
                .then(() => startServer())
                .catch(console.log);
        })
        .catch(console.log);
} else {
    startServer();
    console.log("Server is running on localhost");
}
