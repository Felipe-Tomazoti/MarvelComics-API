import fastify from "fastify";
import 'dotenv/config';
import { prisma } from "./lib/prisma";

class App {
    public fastify = fastify();
    public constructor() {
        this.database();
        this.setupSwagger(); 
        this.routes(); 
    }

    private async database() {
        try {
            await prisma.$connect();
            if (process.env.NODE_ENV !== 'test') {
                console.log("Conexão com o banco de dados estabelecida com sucesso");
                console.log("DICA: Para popular o banco de dados, execute a rota (GET): /startApi");
            }
        } catch (error) {
            console.log(error);
        }
    }

    private async routes() {
        this.fastify.register(require('./routes/characters.route').default);
        this.fastify.register(require('./routes/comics.route').default);
        this.fastify.register(require('./routes/creators.route').default);
        this.fastify.register(require('./routes/start.route').default);
    }

    private async setupSwagger() {
        await this.fastify.register(require('@fastify/swagger'));
        await this.fastify.register(require('@fastify/swagger-ui'), {
            routePrefix: "/doc",
            exposeRoute: true,
            openapi: {
                openapi: '3.0.0',
                info: {
                    title: 'MARVEL API',
                    description: 'Rotas Marvel API',
                    version: '0.1.0'
                },
                servers: [
                    {
                        url: 'http://localhost:3000',
                        description: 'Servidor de Desenvolvimento'
                    }
                ],
                tags: [
                    { name: 'Characters', description: 'Endpoints relacionados aos personagens' },
                    { name: 'Comics', description: 'Endpoints relacionados às HQs' },
                    { name: 'Creators', description: 'Endpoints relacionados aos criadores' },
                    { name: 'Start', description: 'Endpoint de inicialização' }
                ],
                components: {
                    securitySchemes: {
                        apiKey: {
                            type: 'apiKey',
                            name: 'apiKey',
                            in: 'header'
                        }
                    }
                },
                externalDocs: {
                    url: 'https://swagger.io',
                    description: 'Encontre mais informações aqui'
                }
            }
        });
    }
       
}

export default new App().fastify;
