import 'reflect-metadata';
import microCors from 'micro-cors';
import { ApolloServer } from 'apollo-server-micro';
import { schema } from '@graphql/genSchema';
import { NextApiRequest } from 'next';
import { ensureConnection } from '@lib/server/ensureConnection';
import { processRequest } from 'graphql-upload';
import { getSession } from 'next-auth/client';

const cors = microCors({ origin: '*', allowCredentials: true });

process.setMaxListeners(0);

const getApolloServerHandler = async (req: NextApiRequest) => {
    await ensureConnection();

    const server = (userId?: number) =>
        new ApolloServer({
            schema,
            context: ({ req, res }) => {
                return { req, res, userId: userId || undefined };
            },
            tracing: process.env.NODE_ENV === 'development',
            introspection: true,
            playground: true,
            uploads: false,
        }).createHandler({ path: '/api/graphql' });

    const session = await getSession({ req });
    if (!session) {
        return server();
    }
    return server(session.userId as number);
};

export const config = {
    api: {
        bodyParser: false,
    },
};

export default cors(async (req, res) => {
    if (req.method === 'OPTIONS') {
        res.end();
        return false;
    }

    const contentType = req.headers['content-type'];
    if (contentType && contentType.startsWith('multipart/form-data')) {
        (req as any).filePayload = await processRequest(req, res);
    }

    const serverHandler = await getApolloServerHandler(req as any);
    return serverHandler(req, res);
});
