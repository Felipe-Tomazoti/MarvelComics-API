import { prisma } from '../lib/prisma';
import axios from 'axios';

export class CreatorService {
    async getAll() {
        try {
            const creator = await prisma.creator.findMany();
            return await creator.map((creator: any) => creator.name);
        } catch (error) {
            console.error('Erro ao obter dados de creator:', error);
            throw new Error('Erro ao obter dados de creator');
        }
    }

    async getByName(name: string) {
        try {
            const creator = await prisma.creator.findUnique({
                where: {
                    name: name,
                },
            });
            return creator;
        } catch (error) {
            console.error('Erro ao buscar creator:', error);
            throw new Error('Erro ao buscar creator');
        }
    }

    async create(body: any) {
        try {
            const newcreator = await prisma.creator.create({
                data: {
                    name: body.name,
                    function: body.function,
                    comicName: body.comicName,
                },
            });
            return newcreator;
        } catch (error) {
            console.error('Erro ao criar creator:', error);
            throw new Error('Erro ao criar creator');
        }
    }

    async update(name: string, body: any) {
        try {
            const creatorUpdated = await prisma.creator.update({
                where: {
                    name: name,
                },
                data: {
                    name: body.name,
                    function: body.function,
                    comicName: body.comicName,
                }
            })
            return creatorUpdated;
        } catch (error) {
            console.log(error)
        }
    }

    async delete(name: string) {
        try {
            await prisma.creator.delete({
                where: {
                    name: name,
                },
            })
        } catch (error) {
            console.log(error)
        }
    }

    async pencillerGetAll() {
        try {
            const pencillerGetAll = (await prisma.creator.findMany()).map((obj: any) => {
                if (obj.function.includes("penciller") === true) {
                    return {name: obj.name, function: obj.function}
                }
            }).filter((obj:any) => obj != null)
            return pencillerGetAll;
        } catch (error) {
            console.log(error)
        }
    }


    async getCratorsMinusTen() {
        try {
            const creators = await prisma.$queryRaw`
                SELECT name, "comicName" 
                FROM "Creator" 
                WHERE array_length("comicName", 1) < 10
            `;
            return creators;
        } catch (error) {
            console.error('Erro ao obter criadores: ', error);
            throw new Error('Erro ao obter criadores');
        }
    }


}


