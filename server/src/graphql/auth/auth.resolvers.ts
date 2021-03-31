import { Resolvers } from '@gql/types';
import bcrypt from 'bcryptjs';
import { createTokens } from '@utils/createTokens';
import { User } from '@entity/User';

export const resolvers: Resolvers = {
    Mutation: {
        register: async (_, { email, password, name }) => {
            const hashedPassword = await bcrypt.hash(password, 10);
            try {
                await User.create({ email, name, password: hashedPassword }).save();
            } catch {
                return false;
            }
            return true;
        },
        login: async (_, { email, password }, { res }) => {
            const user = await User.findOne({ where: { email } });
            if (!user)
                return {
                    path: 'login',
                    message: 'email or password is incorrect',
                };
            const isValid = await bcrypt.compare(password, user.password);
            if (!isValid)
                return {
                    path: 'login',
                    message: 'Email or password is incorrect',
                };

            const { refreshToken, accessToken } = createTokens(user);

            res.cookie('refresh-token', refreshToken, { maxAge: 1000 * 60 * 60 * 24 * 7 }); // 7 days
            res.cookie('access-token', accessToken, { maxAge: 1000 * 60 * 15 }); //15 minutes

            return user;
        },
        invalidateTokens: async (_, _a, { userId }) => {
            if (!userId) return false;

            const user = await User.findOne(userId);

            if (!user) return false;

            // This will invalidate the refresh-token
            await User.createQueryBuilder()
                .update(user)
                .set({ count: () => 'count + 1' })
                .where('id = :id', { id: userId })
                .execute();

            return true;
        },
    },
};
