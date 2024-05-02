import { deepStrictEqual } from 'node:assert'
import { runSeedCharacters} from './runSeedCharacters'
import { prisma } from '../src/lib/prisma'

describe('Should test character endpoints', () => {
    let _testServer: any
    let _testServerAddress: string

    async function create(character: any) {
        return await _testServer.inject({
            method: 'POST',
            url: `${_testServerAddress}/characterCreate`,
            payload: character,
        })
    }

    async function getAll() {
        return await _testServer.inject({
            method: 'GET',
            url: `${_testServerAddress}/characterGetAll`,
        })
    }

    async function getByName(Name: any) {
        return await _testServer.inject({
            method: 'GET',
            url: `${_testServerAddress}/characterGetByName/${Name}`,
            payload: Name,
        })
    }

    async function update(Name: string, body: any) {
        return await _testServer.inject({
            method: 'PUT',
            url: `${_testServerAddress}/characterUpdate/${Name}`,
            payload: body,
        })
    }

    async function Delete(Name: string) {
        return await _testServer.inject({
            method: 'DELETE',
            url: `${_testServerAddress}/characterDelete/${Name}`,
            payload: Name,
        })
    }

    beforeAll(async () => {
        const { server }: any = await import('../src/server');
        if (!_testServer) {
            _testServer = await server;
            _testServerAddress = 'http://localhost:5432';
        }
    })

    beforeEach(async () => {
        await runSeedCharacters();
    });

    afterEach(async() => {
        await prisma.character.deleteMany({});
        await prisma.comic.deleteMany({});
        await prisma.creator.deleteMany({});
    })
    
    afterAll(async () => {
        await prisma.character.deleteMany({});
        await prisma.comic.deleteMany({});
        await prisma.creator.deleteMany({});

        if (_testServer) {
            await _testServer.close();
        }
    })

    it('Should create character', async () => {
        const input = {
            name: "Felipe Cesar",
            description: "Best in the word",
            url: "https://upload.wikimedia.org/wikipedia/pt/8/8d/Batman_por_Jim_Lee.jpg"
        }

        const obj = await create(input);
        const objParsed = JSON.parse(obj.body)
        const name = objParsed.name
        const statusCode = obj.statusCode;

        deepStrictEqual(name, input.name);
        deepStrictEqual(statusCode, 201);
    });

    it('should getAll characters', async() => {
        const allCharacters = await getAll();
        const statusCode = allCharacters.statusCode;
        const lengthArray = JSON.parse(allCharacters.body)
        const isLengthGreaterOrEqualThree = lengthArray.length >= 3 

        deepStrictEqual(isLengthGreaterOrEqualThree, lengthArray.length>=3)
        deepStrictEqual(statusCode, 200);
    });
    
    it('Should getByName character', async() => {
        const input = {
            name: "Felipe Cesar",
            description: "Best in the word",
            url: "https://upload.wikimedia.org/wikipedia/pt/8/8d/Batman_por_Jim_Lee.jpg"
        }

        const obj = await create(input);
        const objParsed = JSON.parse(obj.body);
        const name = objParsed.name;

        const objBrought = await getByName(name);
        const objParsed2 = JSON.parse(objBrought.body);
        const nameBrought = objParsed2.name;

        const statusCode = objBrought.statusCode;

        deepStrictEqual(name, nameBrought);
        deepStrictEqual(statusCode, 200);
    })

    it('Should update character', async() => {
        const input = {
            name: "Felipe Cesar",
            description: "Best in the word",
            url: "https://upload.wikimedia.org/wikipedia/pt/8/8d/Batman_por_Jim_Lee.jpg"
        }

        const obj = await create(input);
        const objParsed = JSON.parse(obj.body);
        const name = objParsed.name;

        const characterUpdate = {
            name: "Jose da Silva",
            description: "This description will be actualized",
            url: "https://upload.wikimedia.org/wikipedia/pt/8/8d/Batman_por_Jim_Lee.jpg"
        }

        const characterUpdated = await update(name, characterUpdate);
        const objParsed2 = JSON.parse(characterUpdated.body);
        const statusCode = characterUpdated.statusCode;

        deepStrictEqual(characterUpdate.name, objParsed2.name);
        deepStrictEqual(statusCode, 202);
    })

    it('Should delete character', async() => {
        const input = {
            name: "Felipe Cesar",
            description: "Best in the word",
            url: "https://upload.wikimedia.org/wikipedia/pt/8/8d/Batman_por_Jim_Lee.jpg"
        }

        const obj = await create(input);
        const objParsed = JSON.parse(obj.body);
        const name = objParsed.name;

        const excluded = await Delete(name); 
        const msg = excluded.body
        const statusCode = excluded.statusCode;
        const expected = "Excluded Character"

        deepStrictEqual(statusCode, 200);
        deepStrictEqual(msg, expected)
    })
})