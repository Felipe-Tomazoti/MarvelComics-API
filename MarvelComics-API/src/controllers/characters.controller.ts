import { FastifyRequest, FastifyReply } from 'fastify';
import { CharacterService } from '../services/characters.service';

class CharacterController {

  async getAll(req: FastifyRequest<{ Params: { id: string } }>, res: FastifyReply) {
    try {
      const characters = await new CharacterService().getAll();
      res.status(200).send(characters);
    } catch (error) {
      console.error('Erro ao encontrar todos os personagens:', error);
      res.status(500).send({ error: 'Erro ao encontrar todos os personagens' });
    }
  }

  async getByName(req: FastifyRequest<{ Params: { id: string } }>, res: FastifyReply) {
    try {
      const character = await new CharacterService().getByName(req.params.id);
      res.status(200).send(character);
    } catch (error) {
      console.error('Erro ao encontrar todos os personagens:', error);
      res.status(500).send({ error: 'Erro ao encontrar todos os personagens' });
    }
  }

  async create(req: FastifyRequest, res: FastifyReply) {
    try {
      const character = await new CharacterService().create(req.body);
      res.status(201).send(character)
    } catch (error) {
      console.log(error);
    }
  }

  async update(req: FastifyRequest<{ Params: { id: string } }>, res: FastifyReply) {
    try {
      const character = await new CharacterService().update(req.params.id, req.body);
      res.status(202).send(character)
    } catch (error) {
      console.log(error)
    }
  }

  async delete(req: FastifyRequest<{ Params: { id: string } }>, res: FastifyReply) {
    try {
      await new CharacterService().delete(req.params.id);
      res.status(200).send("Excluded Character")
    } catch (error) {
      console.log(error)
    }
  }

  async characterImages(req: FastifyRequest<{ Params: { id: string } }>, res: FastifyReply) {
    try {
      const getAllImages = await new CharacterService().characterImages();
      res.status(200).send(getAllImages)
    } catch (error) {
      console.log(error)
    }
  }

}
export default new CharacterController();
