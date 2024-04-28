import { prisma } from '../lib/prisma';
import { publicKey, ts, createHash} from '../HashCode/geraHash';

export class CharacterService{ 

    async getAll(){
        try{
          const hash = createHash();
              const objs = fetch(`https://gateway.marvel.com/v1/public/events?ts=${ts}&apikey=${publicKey}&hash=${hash}&name=House%20of%20M`)
              .then((response) => {return response.json();
              }).then((jsonParsed) => {
                  const houseOfM = jsonParsed.data.results;
                  const transformed = houseOfM.map((obj:any) => {
                    return obj.characters.items.map((character:any) => character.name); 
                  });
                  return (transformed);
                });
              
            return objs;
            }catch(error){
              console.error('Erro ao obter dados do personagem da Marvel:', error);
        }
    }

    async getById(id: string){
      try{
        const hash = createHash();
              const objs = fetch(`https://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}&name=${id}`)
              .then((response) => {return response.json();});
            return objs;
      }catch(error){
        console.log(error)
      }
    }
}

  /*
await axios.get(`https://gateway.marvel.com/v1/public/characters/${marvelId}`, {
        params: {
          apikey: '',
        },
*/ 
