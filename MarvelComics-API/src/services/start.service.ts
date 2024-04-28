import { publicKey, ts, createHash} from '../HashCode/geraHash';

export class StartSerivce{
    async insertCharacters(){ // TEM QUE BUSCAR NOME, ID E URL COM FINAL .JPG. E JOGAR NO DB COM PRISMA.
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
}