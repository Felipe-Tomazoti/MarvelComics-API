import 'dotenv/config';
import { prisma } from "../../src/lib/prisma"
import {comics} from './datas.test.ts/dataTests'

const isTestEnv = process.env.NODE_ENV === 'test';

async function runSeedComics() {
    try {
        await prisma.character.deleteMany({});
        await prisma.comic.deleteMany({});
        await prisma.creator.deleteMany({});
        
        comics.map(async(obj) => await prisma.comic.create({
            data: {
                title: obj.title,
                description: obj.description,
                postedDate: obj.postedDate,
                cover: obj.cover,
            }
        }))
    } catch (error) {
        console.log(error)
    } finally {
        await prisma.$disconnect();
    }
}

if (!isTestEnv) runSeedComics();

export { runSeedComics };