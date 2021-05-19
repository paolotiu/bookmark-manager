import { getConnectionOptions, createConnection, getConnection } from 'typeorm';

let connectionReadyPromise: Promise<void> | null = null;

export const createTypeormConn = async () => {
    if (!connectionReadyPromise) {
        connectionReadyPromise = (async () => {
            // clean up old connection that references outdated hot-reload classes
            try {
                const staleConnection = getConnection();
                await staleConnection.close();
            } catch (error) {
                // no stale connection to clean up
            }

            const connectionOptions = await getConnectionOptions(process.env.NODE_ENV);
            // wait for new default connection
            await createConnection({ ...connectionOptions, name: 'default' });
        })();
    }

    return connectionReadyPromise;
};
