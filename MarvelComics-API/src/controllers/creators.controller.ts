import { FastifyRequest, FastifyReply } from 'fastify';
import { CreatorService } from '../services/creators.service';

class CreatorController{
    async getAll(req: FastifyRequest<{ Params: { id: string } }>, res: FastifyReply) {
        try {
          const Creators = await new CreatorService().getAll();
          res.status(200).send(Creators);
        } catch (error) {
          console.error('Erro ao encontrar todos os Creators:', error);
          res.status(500).send({ error: 'Erro ao encontrar todos os Creators' });
        }
      }
    
      async getByName(req: FastifyRequest<{ Params: { id: string } }>, res: FastifyReply) {
        try {
          const Creator = await new CreatorService().getByName(req.params.id);
          res.status(200).send(Creator);
        } catch (error) {
          console.error('Erro ao encontrar todos os Creators:', error);
          res.status(500).send({ error: 'Erro ao encontrar todos os Creators' });
        }
      }
    
      async create(req: FastifyRequest, res: FastifyReply) {
        try {
          const Creator = await new CreatorService().create(req.body);
          res.status(201).send(Creator)
        } catch (error) {
          console.log(error);
        }
      }
    
      async update(req: FastifyRequest<{ Params: { id: string } }>, res: FastifyReply) {
        try {
          const Creator = await new CreatorService().update(req.params.id, req.body);
          res.status(202).send(Creator)
        } catch (error) {
          console.log(error)
        }
      }
    
      async delete(req: FastifyRequest<{Params: {id: string}}>, res: FastifyReply) {
        try {
          await new CreatorService().delete(req.params.id);
          res.status(200).send("Excluded Creator")
        } catch (error) {
          console.log(error)
        }
      }

      async pencillerGetAll(req: FastifyRequest<{ Params: { id: string } }>, res: FastifyReply){
        try{
            const pencillerGetAll = await new CreatorService().pencillerGetAll()
            res.status(200).send(pencillerGetAll)
        }catch(error){
            console.log(error)
        }
      }

      async getCratorsMinusTen(req: FastifyRequest<{ Params: { id: string } }>, res: FastifyReply){
        try{
            const getCratorsMinusTen = await new CreatorService().getCratorsMinusTen()
            res.status(200).send(getCratorsMinusTen)
        }catch(error){
            console.log(error)
        }
      }
}

export default new CreatorController();