import fastify from "fastify"
import 'dotenv/config'
// import { prisma } from "./lib/prisma"

class App {
    public fastify = fastify()
    public constructor() {
        ///this.database();
    }

    /*private async database() {
        try {
            await prisma.$connect();
            console.log("Connect database success")
        } catch (error) {
            console.log(error)
        }
    } */
}

export default new App().fastify;