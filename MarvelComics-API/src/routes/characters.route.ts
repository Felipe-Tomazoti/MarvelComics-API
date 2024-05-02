import { FastifyInstance } from "fastify"
import characterController from "../controllers/characters.controller"

export default async function(fastify: FastifyInstance){
    fastify.post('/characterCreate', characterController.create);
    fastify.get('/characterGetAll', characterController.getAll);
    fastify.get('/characterGetByName/:id', characterController.getByName);
    fastify.get('/characterImages', characterController.characterImages);
    fastify.put('/characterUpdate/:id', characterController.update);
    fastify.delete('/characterDelete/:id', characterController.delete);
}