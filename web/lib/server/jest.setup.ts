import { createTypeormConn } from '@lib/server/createTypeormConn';

jest.setTimeout(30000);
beforeAll(async () => {
    global.__conn = await createTypeormConn();
});

afterAll(async () => {
    global.__conn?.close();
});
