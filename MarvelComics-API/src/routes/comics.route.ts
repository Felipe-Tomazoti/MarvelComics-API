import { FastifyInstance } from "fastify"
import comicController from "../controllers/comics.controller";

export default async function(fastify: FastifyInstance){
    fastify.post('/comicCreate', comicController.create);
    fastify.get('/comicGetAll', comicController.getAll);
    fastify.get('/comicCoverGetAll', comicController.comicCoverGetAll);
    fastify.get('/comicGetByTitle/:id', comicController.getByTitle);
    fastify.get('/comicAfter2005', comicController.comicAfter2005);
    fastify.put('/comicUpdate/:id', comicController.update);
    fastify.delete('/comicDelete/:id', comicController.delete);
}