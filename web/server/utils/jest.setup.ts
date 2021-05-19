import { createTypeormConn } from './createTypeormConn';

beforeAll(async () => {
    global.__conn = await createTypeormConn();
});

afterAll(async () => {
    global.__conn?.close();
});
