import { Knex } from "./server/database/knex";
import { server } from "./server/Server";

const startServer = () =>
    server.listen(process.env.PORT || 3333, () =>
        console.log(`app running in the port: ${process.env.PORT}`)
    );

console.log("Imigration is started");

Knex.migrate.latest().then(() => {
    Knex.seed
        .run()
        .then(() => startServer())
        .catch(console.log);
    console.log("Imigration is running and seed");
});
