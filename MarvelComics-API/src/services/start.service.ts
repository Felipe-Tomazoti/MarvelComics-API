import { prisma } from '../lib/prisma';
import { publicKey, ts, createHash } from '../HashCode/geraHash';

export class StartSerivce {
  async insertCharactersComicsCreators() {
    try {
      let transformed: any = [];
      let creatorsFunction:any = []; 
      let creatorsName:any = [];
      let comicModified:any = null;

      const hash = createHash();
      const characters = fetch(`https://gateway.marvel.com/v1/public/events?ts=${ts}&apikey=${publicKey}&hash=${hash}&name=House%20of%20M`)
        .then((response) => {
          return response.json();
        }).then((jsonParsed) => {
          const houseOfM = jsonParsed.data.results;
          houseOfM.map((obj: any) => {
            transformed = obj.characters.items.map((character: any) => character.name);
          });
          return transformed;
        });

      let infos = null
      await prisma.character.deleteMany({});
      for (let character of await characters) {
        infos = await fetch(`https://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}&name=${character}`)
          .then((response) => { return response.json(); })
          .then(async (jsonParsed) => {
            const infoAll = jsonParsed.data.results;
            const name = infoAll.map((info: any) => info.name);
            const description = infoAll.map((info: any) => info.description);
            const url = infoAll.map((info: any) => info.thumbnail.path + '.' + info.thumbnail.extension)
            await prisma.character.create({
              data: {
                name: name[0],
                description: description[0],
                url: url[0],
              }
            })
          });
      }

      // COMICS

      const comics = fetch(`https://gateway.marvel.com/v1/public/events?ts=${ts}&apikey=${publicKey}&hash=${hash}&name=House%20of%20M`)
        .then((response) => {
          return response.json();
        })
        .then((jsonParsed) => {
          const comicsHouseofM = jsonParsed.data.results
          comicsHouseofM.map((obj: any) => {
            transformed = obj.comics.items.map((comic: any) => comic.resourceURI);
            transformed = transformed.map((uri: any) => uri.match(/\/(\d+)$/)[1]);
          })
          return transformed
        });

      await prisma.comic.deleteMany({});
      for (let comic of await comics) {
        infos = await fetch(`https://gateway.marvel.com/v1/public/comics?ts=${ts}&apikey=${publicKey}&hash=${hash}&id=${comic}`)
          .then((response) => { return response.json(); })
          .then(async (jsonParsed) => {
            const infoAllComics = jsonParsed.data.results;
            const comicTitle = infoAllComics.map((info: any) => info.title);
            const comicDescription = infoAllComics.map((info: any) => info.description)
            infoAllComics.map((comic: any) => {
              comic.dates.map((published:any) => {
                if(published.type === 'onsaleDate'){
                  comicModified = published.date;
                } else{
                  return false
                }
              }).filter((itsTrue:any) => itsTrue != false)
            });
            const comicUrl = infoAllComics.map((info: any) => info.thumbnail.path + '.' + info.thumbnail.extension)
            const description = comicDescription[0] === null ? '' : comicDescription[0];
            await prisma.comic.create({
              data: {
                title: comicTitle[0],
                description: description,
                postedDate: new Date(comicModified).toISOString(),
                cover: comicUrl[0],
              }
            })
          })
        }
        // CREATORS
          
        const creators = fetch(`https://gateway.marvel.com/v1/public/events?ts=${ts}&apikey=${publicKey}&hash=${hash}&name=House%20of%20M`)
          .then((response) => {
            return response.json();
          })
          .then((jsonParsed) => {
            const creatorsHouseofM = jsonParsed.data.results
            creatorsHouseofM.map(async(obj: any) => {
              transformed = obj.creators.items.map((creator: any) => creator.resourceURI);
              transformed = transformed.map((uri: any) => uri.match(/\/(\d+)$/)[1]);
              creatorsName = obj.creators.items.map((creator: any) => creator.name);
              creatorsFunction = obj.creators.items.map((creator: any) => creator.role);
            });
            return transformed
          });

        await prisma.creator.deleteMany({});
        let x = 0;
        for (let creator of await creators) {
          infos = await fetch(`https://gateway.marvel.com/v1/public/creators?ts=${ts}&apikey=${publicKey}&hash=${hash}&id=${creator}`)
            .then((response) => { return response.json(); })
            .then(async (jsonParsed) => {
              const infoAllCreators = jsonParsed.data.results;
              const creatorsComics = infoAllCreators.map((info: any) => {
                return info.comics.items.map((title:any) => title.name)
              });
              await prisma.creator.create({
                data: {
                  name: creatorsName[x],
                  function: creatorsFunction[x],
                  comicName: creatorsComics.flat(),
                }
              })
              x++;
            })
        }
    } catch (error) {
      console.error('Erro ao obter dados do personagem da Marvel:', error);
    }
  }
}
