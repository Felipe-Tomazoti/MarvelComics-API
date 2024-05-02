import 'dotenv/config';
import { prisma } from "../src/lib/prisma"
import { characters, comics, creators } from './dataTests'

const isTestEnv = process.env.NODE_ENV === 'test';

async function runSeedCharacters() {
    try {
        await prisma.character.deleteMany({});
        await prisma.comic.deleteMany({});
        await prisma.creator.deleteMany({});

        characters.map(async(obj) => await prisma.character.create({
            data: {
                name: obj.name,
                description: obj.description,
                url: obj.url,
            },
        }))
    } catch (error) {
        console.log(error)
    } finally {
        await prisma.$disconnect();
    }
}

if (!isTestEnv) runSeedCharacters();

export { runSeedCharacters };