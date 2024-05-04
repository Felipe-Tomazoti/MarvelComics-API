import { deepStrictEqual } from 'node:assert'
import { runSeedComics } from './config.test.ts/runSeedComics'
import { prisma } from '../src/lib/prisma'

describe('Should test comics endpoints', () => {
    let _testServer: any
    let _testServerAddress: string

    async function create(comic: any) {
        return await _testServer.inject({
            method: 'POST',
            url: `${_testServerAddress}/comicCreate`,
            payload: comic,
        })
    }

    async function getAll() {
        return await _testServer.inject({
            method: 'GET',
            url: `${_testServerAddress}/comicGetAll`,
        })
    }

    async function getByTitle(Title: any) {
        return await _testServer.inject({
            method: 'GET',
            url: `${_testServerAddress}/comicGetByTitle/${Title}`,
            payload: Title,
        })
    }

    async function update(Title: string, body: any) {
        return await _testServer.inject({
            method: 'PUT',
            url: `${_testServerAddress}/comicUpdate/${Title}`,
            payload: body,
        })
    }

    async function Delete(Title: string) {
        return await _testServer.inject({
            method: 'DELETE',
            url: `${_testServerAddress}/comicDelete/${Title}`,
            payload: Title,
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
        await runSeedComics;
    });

    afterAll(async () => {
        await prisma.character.deleteMany({});
        await prisma.comic.deleteMany({});
        await prisma.creator.deleteMany({});

        if (_testServer) {
            await _testServer.close()
        }
    })

    it('Should create comic', async () => {
        const input = {
            title: "Batman",
            description: "Rich, Rich and Rich",
            postedDate: "2024-02-16T18:11:04Z",
            cover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7-4nQIkOknL37Xt8siNUtoHGlSOGBprfX4w&s"
        }

        const obj = await create(input);
        const objParsed = JSON.parse(obj.body)
        const title = objParsed.title
        const statusCode = obj.statusCode;

        deepStrictEqual(title, input.title);
        deepStrictEqual(statusCode, 201);
    });

    it('Should getAll comics', async () => {
        const allComics = await getAll();
        const statusCode = allComics.statusCode;
        const lengthArray = JSON.parse(allComics.body)
        const isLengthGreaterOrEqualThree = lengthArray.length >= 3

        deepStrictEqual(isLengthGreaterOrEqualThree, lengthArray.length >= 3)
        deepStrictEqual(statusCode, 200);
    });

    it('Should getByTitle comic', async () => {
        const input = {
            title: "Comic 1",
            description: "Spider",
            postedDate: "2019-08-16T18:11:04Z",
            cover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7-4nQIkOknL37Xt8siNUtoHGlSOGBprfX4w&s"
        }

        const obj = await create(input);
        const objParsed = JSON.parse(obj.body);
        const title = objParsed.title;

        const objBrought = await getByTitle(title);
        const objParsed2 = JSON.parse(objBrought.body);
        const titleBrought = objParsed2.title;

        const statusCode = objBrought.statusCode;

        deepStrictEqual(title, titleBrought);
        deepStrictEqual(statusCode, 200);
    })

    it('Should update comic', async () => {
        const input = {
            title: "Comic 2",
            description: "IronMan",
            postedDate: "2016-08-16T18:11:04Z",
            cover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7-4nQIkOknL37Xt8siNUtoHGlSOGBprfX4w&s"
        }

        const obj = await create(input);
        const objParsed = JSON.parse(obj.body);
        const title = objParsed.title;

        const comicUpdate = {
            title: "Comic 3",
            description: "Deadpool",
            postedDate: "2015-08-16T18:11:04Z",
            cover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7-4nQIkOknL37Xt8siNUtoHGlSOGBprfX4w&s"
        }

        const comicUpdated = await update(title, comicUpdate);
        const objParsed2 = JSON.parse(comicUpdated.body);
        const statusCode = comicUpdated.statusCode;

        deepStrictEqual(comicUpdate.title, objParsed2.title);
        deepStrictEqual(statusCode, 202);
    })

    it('Should delete comic', async () => {
        const input = {
            title: "Comic 4",
            description: "SpiderMan",
            postedDate: "2020-08-16T18:11:04Z",
            cover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7-4nQIkOknL37Xt8siNUtoHGlSOGBprfX4w&s"
        }

        const obj = await create(input);
        const objParsed = JSON.parse(obj.body);
        const title = objParsed.title;

        const excluded = await Delete(title);
        const msg = excluded.body
        const statusCode = excluded.statusCode;
        const expected = "Excluded Comic"

        deepStrictEqual(statusCode, 200);
        deepStrictEqual(msg, expected)
    })
})