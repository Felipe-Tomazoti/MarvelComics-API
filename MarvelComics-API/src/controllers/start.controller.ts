import { FastifyRequest, FastifyReply } from 'fastify';
import { StartSerivce } from '../services/start.service';

class StartController{
    async start(req: FastifyRequest<{ Params: { id: string } }>, res: FastifyReply) {
        try {
          await new StartSerivce().insertCharactersComicsCreators();
          res.status(200).send("Database done for use 😄");
        } catch (error) {
          res.status(500);
        }
      }
}

export default new StartController();