import { deepStrictEqual } from 'node:assert'
import { runSeedCharacters } from './config.test.ts/runSeedCharacters'
import { prisma } from '../src/lib/prisma'

describe('Should test character endpoints', () => {
    let _testServer: any
    let _testServerAddress: string

    async function getAllImages(){
        return await _testServer.inject({
            method: 'GET',
            url: `${_testServerAddress}/characterImages`,
        })
    }

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

    afterAll(async () => {
        await prisma.character.deleteMany({});
        await prisma.comic.deleteMany({});
        await prisma.creator.deleteMany({});
        await _testServer.close();
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

    it('Should getAll characters', async () => {
        const allCharacters = await getAll();
        const statusCode = allCharacters.statusCode;
        const lengthArray = JSON.parse(allCharacters.body)
        const isLengthGreaterOrEqualThree = lengthArray.length >= 3

        deepStrictEqual(isLengthGreaterOrEqualThree, lengthArray.length >= 3)
        deepStrictEqual(statusCode, 200);
    });

    it('Should getByName character', async () => {
        const input = {
            name: "Cesar Felipe",
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

    it('Should update character', async () => {
        const input = {
            name: "Antonio",
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

    it('Should delete character', async () => {
        const input = {
            name: "Milton",
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

    it('Should getAll imagens from characters', async()=> {
        const characters = await getAll();
        const characOBJ = JSON.parse(characters.body)

        const character1 = await getByName(characOBJ[0]);
        const objParsed1 = JSON.parse(character1.body);
        const url0 = objParsed1.url;
        
        const character2 = await getByName(characOBJ[1]);
        const objParsed2 = JSON.parse(character2.body);
        const url1 = objParsed2.url;

        const character3 = await getByName(characOBJ[2]);
        const objParsed3 = JSON.parse(character3.body);
        const url2 = objParsed3.url;

        const objs = await getAllImages();
        const obj = JSON.parse(objs.body).flat()
        const objURLS = obj.map((element:any) => element.url); 
        const statusCode = objs.statusCode;
        
        deepStrictEqual(statusCode, 200);
        deepStrictEqual(objURLS[0], url0);
        deepStrictEqual(objURLS[1], url1);
        deepStrictEqual(objURLS[2], url2);
    })
})