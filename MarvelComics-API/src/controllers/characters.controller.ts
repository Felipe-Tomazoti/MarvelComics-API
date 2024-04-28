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

  async getById(req: FastifyRequest<{ Params: { id: string } }>, res: FastifyReply) {
    try {
      const character = await new CharacterService().getById(req.params.id);
      res.status(200).send(character);
    } catch (error) {
      console.error('Erro ao encontrar todos os personagens:', error);
      res.status(500).send({ error: 'Erro ao encontrar todos os personagens' });
    }
  }

  async create(req: FastifyRequest, res: FastifyReply) {
    try {

    } catch (error) {
      console.log(error);
    }
  }


}

export default new CharacterController();
