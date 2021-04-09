import { Connection } from 'typeorm';
import { createTypeormConn } from './createTypeormConn';

let conn: Connection;
beforeAll(async () => {
    conn = await createTypeormConn();
});

afterAll(async () => {
    conn.close();
});
