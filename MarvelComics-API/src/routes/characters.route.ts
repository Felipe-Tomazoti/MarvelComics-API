import { FastifyInstance } from "fastify"
import characterController from "../controllers/characters.controller"

export default async function(fastify: FastifyInstance){

    //fastify.post('/characterCreate', characterController.create);
    fastify.get('/characterGetAll', characterController.getAll);
    fastify.get('/characterGetById/:id', characterController.getById);
    //fastify.put('/characterUpdate', characterController.update);
    //fastify.delete('/characterDelete', characterController.delete);
    
}