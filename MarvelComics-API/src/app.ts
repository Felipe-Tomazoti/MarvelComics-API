import fastify from "fastify"
import 'dotenv/config'
import { prisma } from "./lib/prisma"

class App {
    public fastify = fastify()
    public constructor() {
        this.routes();
        this.database();
    }

    private async database() {
        try {
            await prisma.$connect();
            console.log("Connect database success");
            console.log("TIP: To populate the database, execute the route (GET): /startApi");
        } catch (error) {
            console.log(error);
        }
    }

    private async routes() {
        this.fastify.register(require('./routes/characters.route').default);
        this.fastify.register(require('./routes/comics.route').default);
        this.fastify.register(require('./routes/creators.route').default);
        this.fastify.register(require('./routes/start.route').default);
    }
}

export default new App().fastify;