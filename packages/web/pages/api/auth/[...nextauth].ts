import { User } from '@entity/User';
import bcrypt from 'bcryptjs';
import { ensureConnection } from '@lib/server/ensureConnection';
import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

const protocol = process.env.NODE_ENV === 'development' ? 'http://' : 'https://';
export default NextAuth({
    // Configure one or more authentication providers
    providers: [
        Providers.Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        Providers.Credentials({
            credentials: {
                email: { label: 'email', type: 'email', placeholder: 'jsmith' },
                password: { label: 'Password', type: 'password' },
            },
            authorize: async (credentials) => {
                await ensureConnection();
                const user = await User.findOne({ where: { email: credentials.email } });

                if (!user) return null;

                if (!user.password) return null;

                const isValid = await bcrypt.compare(credentials.password, user.password);
                if (!isValid) return null;

                return { email: user.email, name: user.name, id: user.id };
            },
        }),
    ],
    callbacks: {
        signIn: async (user) => {
            await ensureConnection();
            if (!user.email || !user.name) {
                return false;
            }

            const existingUser = await User.findOne({ where: { email: user.email } });
            if (!existingUser) {
                await User.create({ email: user.email, name: user.name }).save();
            }

            return true;
        },
        jwt: async (token, user) => {
            await ensureConnection();
            if (user) {
                const dbUser = await User.findOne({ where: { email: user?.email } });
                token.userId = dbUser?.id;
            }

            return token;
        },
        session: async (session, token) => {
            session.userId = token.userId;
            return session;
        },
        redirect: () => protocol + process.env.VERCEL_URL + '/home',
    },
    secret: process.env.JWT_SECRET,
});
