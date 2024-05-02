import { prisma } from '../lib/prisma';
import { publicKey, ts, createHash } from '../HashCode/geraHash';
import { title } from 'process';

export class ComicService {

    async getAll() {
        try {
            const comics = await prisma.comic.findMany();
            return await comics.map((comic: any) => comic.title);
        } catch (error) {
            console.error('Erro ao obter dados de comics:', error);
            throw new Error('Erro ao obter dados de comics');
        }
    }

    async getByTitle(title: string) {
        try {
            const comics = await prisma.comic.findUnique({
                where: {
                    title: title,
                },
            });
            return comics;
        } catch (error) {
            console.error('Erro ao buscar comic:', error);
            throw new Error('Erro ao buscar comic');
        }
    }

    async create(body: any) {
        try {
            const newComic = await prisma.comic.create({
                data: {
                    title: body.title,
                    description: body.description,
                    postedDate: body.postedDate,
                    cover: body.cover,
                },
            });
            return newComic;
        } catch (error) {
            console.error('Erro ao criar comic:', error);
            throw new Error('Erro ao criar comic');
        }
    }

    async update(title: string, body: any) {
        try {
            const comicUpdated = await prisma.comic.update({
                where: {
                    title: title,
                },
                data: {
                    title: body.title,
                    description: body.description,
                    postedDate: body.postedDate,
                    cover: body.cover,
                }
            })
            return comicUpdated;
        } catch (error) {
            console.log(error)
        }
    }

    async delete(title: string) {
        try {
            await prisma.comic.delete({
                where: {
                    title: title,
                },
            })
        } catch (error) {
            console.log(error)
        }
    }


    async comicCoverGetAll() {
        try {
            const comics = await prisma.comic.findMany();
            return await comics.map((comic: any) => { return { title: comic.title, cover: comic.cover } });
        } catch (error) {
            console.error('Erro ao obter comics cover:', error);
            throw new Error('Erro ao obter comics cover.');
        }
    }

    async comicAfter2005() {
        try {
            let comicAfter2005: any = await prisma.comic.findMany();
            comicAfter2005 = comicAfter2005.map((comic: any) => {
                if (comic.postedDate.getFullYear() > 2005) {
                    return { title: comic.title, postedDate: comic.postedDate }
                } else {
                    return null;
                }
            }).filter((comic: any) => comic != null);
            return comicAfter2005;
        } catch (error) {
            console.log(error)
        }
    }
}
