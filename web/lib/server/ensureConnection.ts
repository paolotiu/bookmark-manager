import { Connection, getConnectionManager } from 'typeorm';
import { User } from 'entity/User';
import { Bookmark } from 'entity/Bookmark';
import { Folder } from 'entity/Folder';

// Serverless typeorm workaround
// https://github.com/typeorm/typeorm/issues/6241#issuecomment-643690383

const options: any = {
    default: {
        type: 'postgres',
        host: 'localhost',
        port: 5433,
        username: 'postgres',
        password: process.env.DB_PASSWORD,
        database: 'bookmark',
        synchronize: true,
        logging: true,
        entities: [User, Bookmark, Folder],
    },
};
function entitiesChanged(prevEntities: any[], newEntities: any[]): boolean {
    if (prevEntities.length !== newEntities.length) return true;

    for (let i = 0; i < prevEntities.length; i++) {
        if (prevEntities[i] !== newEntities[i]) return true;
    }

    return false;
}

async function updateConnectionEntities(connection: Connection, entities: any[]) {
    if (!entitiesChanged(connection.options.entities as any, entities)) return;

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    connection.options.entities = entities;

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    connection.buildMetadatas();

    if (connection.options.synchronize) {
        await connection.synchronize();
    }
}

export async function ensureConnection(name = 'default'): Promise<Connection> {
    const connectionManager = getConnectionManager();
    if (connectionManager.has(name)) {
        const connection = connectionManager.get(name);

        if (!connection.isConnected) {
            await connection.connect();
        }

        if (process.env.NODE_ENV !== 'production') {
            await updateConnectionEntities(connection, options[name].entities);
        }

        return connection;
    }

    return await connectionManager.create({ name, ...options[name] }).connect();
}
