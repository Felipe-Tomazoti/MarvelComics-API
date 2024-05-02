import { FastifyInstance } from "fastify"
import creatorController from "../controllers/creators.controller"

export default async function(fastify: FastifyInstance){
    fastify.post('/creatorCreate', creatorController.create);
    fastify.get('/creatorGetAll', creatorController.getAll);
    fastify.get('/creatorGetByName/:id', creatorController.getByName);
    fastify.get('/pencillerGetAll', creatorController.pencillerGetAll);
    fastify.get('/getCreatorsMinusTen', creatorController.getCratorsMinusTen);
    fastify.put('/creatorUpdate/:id', creatorController.update);
    fastify.delete('/creatorDelete/:id', creatorController.delete);
}