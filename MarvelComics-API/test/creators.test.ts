import { deepStrictEqual } from 'node:assert'
import { runSeedCreators } from './config.test.ts/runSeedCreators'
import { prisma } from '../src/lib/prisma'

describe('Should test creators endpoints', () => {
    let _testServer: any
    let _testServerAddress: string

    async function getCreatorsMinusTen(){
        return await _testServer.inject({
            method: 'GET',
            url: `${_testServerAddress}/getCreatorsMinusTen`,
        })
    }

    async function getAllPenciller(){
        return await _testServer.inject({
            method: 'GET',
            url: `${_testServerAddress}/pencillerGetAll`,
        })
    }

    async function create(creator: any) {
        return await _testServer.inject({
            method: 'POST',
            url: `${_testServerAddress}/creatorCreate`,
            payload: creator,
        })
    }

    async function getAll() {
        return await _testServer.inject({
            method: 'GET',
            url: `${_testServerAddress}/creatorGetAll`,
        })
    }

    async function getByName(Name: any) {
        return await _testServer.inject({
            method: 'GET',
            url: `${_testServerAddress}/creatorGetByName/${Name}`,
            payload: Name,
        })
    }

    async function update(Name: string, body: any) {
        return await _testServer.inject({
            method: 'PUT',
            url: `${_testServerAddress}/creatorUpdate/${Name}`,
            payload: body,
        })
    }

    async function Delete(Name: string) {
        return await _testServer.inject({
            method: 'DELETE',
            url: `${_testServerAddress}/creatorDelete/${Name}`,
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
        await runSeedCreators();
    });

    afterAll(async () => {
        await prisma.character.deleteMany({});
        await prisma.comic.deleteMany({});
        await prisma.creator.deleteMany({});

        if (_testServer) {
            await _testServer.close()
        }
    })

    it('Should create creator', async () => {

        const input = {
            name: "Junior Manela",
            function: "writer",
            comicName: ["Turma da Mônica", "Turma da Mônica Jovem", "Turma da Mônica Idosa", "Chico Bento - o grande"]
        }

        const obj = await create(input);
        const objParsed = JSON.parse(obj.body)
        const name = objParsed.name
        const statusCode = obj.statusCode;

        deepStrictEqual(name, input.name);
        deepStrictEqual(statusCode, 201);
    });

    it('Should getAll creators', async () => {
        const allcreators = await getAll();
        const statusCode = allcreators.statusCode;
        const lengthArray = JSON.parse(allcreators.body)
        const isLengthGreaterOrEqualThree = lengthArray.length >= 3

        deepStrictEqual(isLengthGreaterOrEqualThree, lengthArray.length >= 3)
        deepStrictEqual(statusCode, 200);
    });

    it('Should getByName creator', async () => {
        const input = {
            name: "Peter Parker",
            function: "penciller",
            comicName: ["Turma da Mônica", "Turma da Mônica Jovem", "Turma da Mônica Idosa", "Chico Bento - o grande"]
        }

        const obj = await create(input);
        const objParsed = JSON.parse(obj.body);
        const name = objParsed.name;

        const objBrought = await getByName(name);
        const objParsed2 = JSON.parse(objBrought.body);
        const NameBrought = objParsed2.name;

        const statusCode = objBrought.statusCode;

        deepStrictEqual(name, NameBrought);
        deepStrictEqual(statusCode, 200);
    })

    it('Should update creator', async () => {
        const input = {
            name: "Halland",
            function: "lyricist",
            comicName: ["Turma da Mônica", "Turma da Mônica Jovem", "Turma da Mônica Idosa", "Chico Bento - o grande"]
        }

        const obj = await create(input);
        const objParsed = JSON.parse(obj.body);
        const name = objParsed.name;

        const creatorUpdate = {
            name: "Cristiano Ronaldo",
            function: "lyricist",
            comicName: ["Turma da Mônica", "Turma da Mônica Jovem", "Turma da Mônica Idosa", "Chico Bento - o grande"]
        }

        const creatorUpdated = await update(name, creatorUpdate);
        const objParsed2 = JSON.parse(creatorUpdated.body);
        const statusCode = creatorUpdated.statusCode;

        deepStrictEqual(creatorUpdate.name, objParsed2.name);
        deepStrictEqual(statusCode, 202);
    })

    it('Should delete creator', async () => {
        const input = {
            name: "Neymar Junior",
            function: "lyricist",
            comicName: ["Turma da Mônica", "Turma da Mônica Jovem", "Turma da Mônica Idosa", "Chico Bento - o grande"]
        }

        const obj = await create(input);
        const objParsed = JSON.parse(obj.body);
        const name = objParsed.name;

        const excluded = await Delete(name);
        const msg = excluded.body
        const statusCode = excluded.statusCode;
        const expected = "Excluded Creator"

        deepStrictEqual(statusCode, 200);
        deepStrictEqual(msg, expected)
    })

    it('Should getAll penciller', async()=> {
        const pencillers = await getAllPenciller();
        const statusCode = pencillers.statusCode;
        const pencillersOBJ = JSON.parse(pencillers.body)
        const functionOBJ = pencillersOBJ.map((element:any) => {return element.function})
        
        deepStrictEqual(statusCode, 200);
        deepStrictEqual(pencillersOBJ.length, 1)        
        deepStrictEqual(functionOBJ[0], "penciller");
    })

    it('Should getAll creators who participated in more than 10 comics', async()=> {
        const creators = await getCreatorsMinusTen(); 
        const statusCode = creators.statusCode;
        const creatorsOBJ = JSON.parse(creators.body)
        const arrayLength = creatorsOBJ.length;
        const numberOfComics = creatorsOBJ[0].comicName.length;
        const current = numberOfComics < 10
    
        deepStrictEqual(statusCode, 200);
        deepStrictEqual(arrayLength, 1)        
        deepStrictEqual(current, true);
    })
})