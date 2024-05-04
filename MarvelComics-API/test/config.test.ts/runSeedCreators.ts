import 'dotenv/config';
import { prisma } from "../../src/lib/prisma"
import { creators } from './datas.test.ts/dataTests'

const isTestEnv = process.env.NODE_ENV === 'test';

async function runSeedCreators(){
    try {
        await prisma.character.deleteMany({});
        await prisma.comic.deleteMany({});
        await prisma.creator.deleteMany({});
        creators.map(async(obj) => await prisma.creator.create({
            data: {
                name: obj.name,
                function: obj.function,
                comicName: obj.comicName,
            },
        }))
    } catch (error) {
        console.log(error)
    } finally {
        await prisma.$disconnect();
    }
}

if (!isTestEnv) runSeedCreators();

export { runSeedCreators };