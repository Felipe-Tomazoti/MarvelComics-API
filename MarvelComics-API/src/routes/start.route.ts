import { FastifyInstance } from "fastify"
import startController from "../controllers/start.controller";

export default async function(fastify: FastifyInstance){
    fastify.get('/startApi', startController.start);
}