import { prisma } from '../lib/prisma';
import { publicKey, ts, createHash } from '../HashCode/geraHash';

export class CharacterService {

  async getAll() {
    try {
      const characters = await prisma.character.findMany({
        orderBy: {
          name: 'asc',
        }
      });
      return await characters.map((obj: any) => obj.name);
    } catch (error) {
      console.error('Erro ao obter dados do personagem da Marvel:', error);
    }
  }

  async getByName(name: string) {
    try {
      const character = await prisma.character.findUnique({
        where: {
          name: name
        }
      })
      return character;
    } catch (error) {
      console.log(error)
    }
  }

  async create(body: any) {
    try {
      const newCharacter = await prisma.character.create({
        data: {
          name: body.name,
          description: body.description,
          url: body.url,
        }
      })
      return newCharacter;
    } catch (error) {
      console.log(error);
    }
  }

  async update(name: string, body: any) {
    try {
      const character = await prisma.character.update({
        where: {
          name: name,
        },
        data: {
          name: body.name,
          description: body.description,
          url: body.url,
        },
      })
      return character;
    } catch (error) {
      console.log(error)
    }
  }

  async delete(name: string){
    try{
      await prisma.character.delete({
        where: {
          name: name,
        },
      })
    }catch(error){
      console.log(error)
    }
  }

  async characterImages(){
    try{
      const characterImages = (await prisma.character.findMany({
        orderBy: {
          name: 'asc',
        }
      })).map((obj:any) => {
        return {name: obj.name, url: obj.url}
      });
      return characterImages;
    }catch(error){
      console.log(error)
    }
  }

}
