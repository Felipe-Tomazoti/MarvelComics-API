import { FastifyRequest, FastifyReply } from 'fastify';
import { ComicService } from '../services/comics.serivce';

class ComicController {

  async getAll(req: FastifyRequest<{ Params: { id: string } }>, res: FastifyReply) {
    try {
      const Comics = await new ComicService().getAll();
      res.status(200).send(Comics);
    } catch (error) {
      console.error('Erro ao encontrar todos os Comics:', error);
      res.status(500).send({ error: 'Erro ao encontrar todos os Comics' });
    }
  }

  async getByTitle(req: FastifyRequest<{ Params: { id: string } }>, res: FastifyReply) {
    try {
      const Comic = await new ComicService().getByTitle(req.params.id);
      res.status(200).send(Comic);
    } catch (error) {
      console.error('Erro ao encontrar todos os comics:', error);
      res.status(500).send({ error: 'Erro ao encontrar todos os comics' });
    }
  }

  async create(req: FastifyRequest, res: FastifyReply) {
    try {
      const Comic = await new ComicService().create(req.body);
      res.status(201).send(Comic)
    } catch (error) {
      console.log(error);
    }
  }

  async update(req: FastifyRequest<{ Params: { id: string } }>, res: FastifyReply) {
    try {
      const Comic = await new ComicService().update(req.params.id, req.body);
      res.status(202).send(Comic)
    } catch (error) {
      console.log(error)
    }
  }

  async delete(req: FastifyRequest<{Params: {id: string}}>, res: FastifyReply) {
    try {
      await new ComicService().delete(req.params.id);
      res.status(200).send("Excluded Comic")
    } catch (error) {
      console.log(error)
    }
  }

  async comicCoverGetAll(req: FastifyRequest<{ Params: { id: string } }>, res: FastifyReply) {
    try {
      const Comics = await new ComicService().comicCoverGetAll();
      res.status(200).send(Comics)
    } catch (error) {
      console.error('Erro ao encontrar todas as capas das Comics:', error);
      res.status(500).send({ error: 'Erro ao encontrar todas as capas das Comics' });
    }
  }

  async comicAfter2005(req: FastifyRequest<{ Params: { id: string } }>, res: FastifyReply){
    try{
      const comicAfter2005 = await new ComicService().comicAfter2005();
      res.status(200).send(comicAfter2005)
    }catch(error){
      console.log(error)
    }
  }
}

export default new ComicController();