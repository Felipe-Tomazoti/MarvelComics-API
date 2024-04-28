import fastify from "fastify"
import 'dotenv/config'
import { prisma } from "./lib/prisma"
import { StartSerivce } from "./services/start.service";

class App {
    public fastify = fastify()
    public constructor() {
        this.routes();
        this.database();
        this.startApp();
        this.closeApp();
    }

    private async database() {
        try {
            await prisma.$connect();
            console.log("Connect database success")
        } catch (error) {
            console.log(error)
        }
    } 

    private async routes(){
        this.fastify.register(require('./routes/characters.route').default);
        this.fastify.register(require('./routes/comics.route').default);
        this.fastify.register(require('./routes/creators.route').default);
    }

    private async startApp(){
        try{
            await new StartSerivce();
        }catch(error){
            console.log(error)
        }
    }

    private closeApp(){
        this.fastify.addHook('onClose', async () => {
            try{
                await prisma.character.deleteMany({});
                await prisma.comic.deleteMany({});
                await prisma.creator.deleteMany({});
                await prisma.$disconnect();
            }catch(error){
                console.log(error);
            }
        })
    }

}

export default new App().fastify;