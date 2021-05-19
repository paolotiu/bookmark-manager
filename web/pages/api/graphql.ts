import 'reflect-metadata';
import microCors from 'micro-cors';
import { ApolloServer } from 'apollo-server-micro';
import { genSchema } from '@graphql/genSchema';
import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import { User } from 'entity/User';
import { setTokenCookies } from '@graphql/auth/auth.resolvers';
import { ensureConnection } from '@lib/server/ensureConnection';
import { createTokens } from '@lib/server/createTokens';

const cors = microCors({ origin: 'https://studio.apollographql.com', allowCredentials: true });
interface AccessTokenPayload {
    userId: number;
    iat: number;
    exp: number;
}

interface RefreshTokenPayload extends AccessTokenPayload {
    count: number;
}

const schema = genSchema();
const getApolloServerHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    await ensureConnection();
    const server = (userId?: number) =>
        new ApolloServer({
            schema,
            context: ({ req, res }) => {
                return { req, res, userId: userId || undefined };
            },

            tracing: true,
        }).createHandler({ path: '/api/graphql' });

    const accessToken = req.cookies['access-token'];
    const refreshToken = req.cookies['refresh-token'];

    try {
        const data = jwt.verify(accessToken, process.env.JWT_SECRET as string) as AccessTokenPayload;
        const userId = data.userId;

        return server(userId);
    } catch {}

    let refreshData;
    try {
        refreshData = jwt.verify(refreshToken, process.env.JWT_SECRET as string) as RefreshTokenPayload;
    } catch {
        return server();
    }

    // Refresh token is valid
    const user = await User.findOne(refreshData.userId);

    // token is invalidated
    if (!user || user.count !== refreshData.count) return server();

    // Get tokens
    const tokens = createTokens(user);
    // Set tokens
    setTokenCookies(res, tokens);

    return server(user.id);
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
    const serverHandler = await getApolloServerHandler(req as any, res as any);

    return serverHandler(req, res);
});
