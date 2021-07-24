import { setCookie } from 'nookies';
import bcrypt from 'bcryptjs';
import { v4 as uuid } from 'uuid';
import jwt from 'jsonwebtoken';
import { User } from '@entity/User';
import { createBaseError, createUnexpectedError, isBaseError } from '@graphql/shared/errorMessages';
import { NextApiResponse } from 'next';
import { CookieSerializeOptions } from 'cookie';
import { createTokens } from '@lib/server/createTokens';
import { BaseError, Resolvers } from '@graphql/generated/graphql';
import { sendEmail } from '@lib/server/sendEmail';
import { registerSchema } from './yupSchemas';

const loginError: BaseError = {
    path: 'login',
    message: 'Email or password is incorrect',
};

export const authResolvers: Resolvers = {
    BooleanOrError: {
        __resolveType: (parent) => (isBaseError(parent) ? 'BaseError' : 'Success'),
    },

    Mutation: {
        register: async (_, { email, password, name }) => {
            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Check if a user with that email exists
            const user = await User.findOne({ email });
            if (user) return createBaseError('register', 'A user with that email already exists');

            // Input validation
            const x = await registerSchema.validate({ email, password, name }).catch((e) => e);
            if (x.errors) return createBaseError('register', x.errors[0]);

            try {
                const newUser = User.create({ email, name, password: hashedPassword }).save();
                return newUser;
            } catch (error) {
                return createUnexpectedError('register');
            }
        },
        login: async (_, { email, password }, { res }) => {
            const user = await User.findOne({ where: { email } });
            if (!user) return loginError;

            if (!user.password) return loginError;

            const isValid = await bcrypt.compare(password, user.password);
            if (!isValid) return loginError;

            const { refreshToken, accessToken } = createTokens(user);
            setTokenCookies(res, { refreshToken, accessToken });

            return user;
        },
        sendForgotPassword: async (_, { email }) => {
            const user = await User.findOne({ where: { email } });

            if (!user) return false;

            const token = uuid();

            // 1 day expiry
            const expiry = new Date();
            expiry.setDate(new Date().getDate() + 1);

            user.resetPasswordExpiry = expiry;
            user.resetPasswordToken = token;

            const jwtToken = jwt.sign({ email: user.email, token }, process.env.JWT_SECRET as string, {
                expiresIn: '1d',
            });

            await user.save();

            await sendEmail({ to: email, text: `http://localhost:3000/forgot/${jwtToken}` });

            return true;
        },
        changePassword: async (_, { email, password, resetToken }, { res }) => {
            const user = await User.findOne({ where: { resetPasswordToken: resetToken, email } });
            if (!user) return createBaseError('resetPassword', 'Token not found');
            if (new Date(user.resetPasswordExpiry as Date).getTime() < Date.now())
                return createBaseError('resetPassword', 'Token expired');

            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);

            user.resetPasswordExpiry = null;
            user.resetPasswordToken = null;
            user.password = hashedPassword;
            user.count += 1;
            removeCookies(res);
            await user.save();

            return { success: true };
        },
        logout: (_, __, { res }) => {
            removeCookies(res);
            return true;
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
function getCookieOptions(time: number): CookieSerializeOptions {
    return {
        maxAge: time,
        sameSite: 'none',
        secure: true,
        httpOnly: true,
    };
}

export function setTokenCookies(
    res: NextApiResponse,
    { refreshToken, accessToken }: { refreshToken: string; accessToken: string },
): void {
    setCookie({ res }, 'refresh-token', refreshToken, getCookieOptions(1000 * 60 * 60 * 24 * 7)); // 7 days
    setCookie({ res }, 'access-token', accessToken, getCookieOptions(1000 * 60 * 15)); // 15 minutes
}

export function removeCookies(res: NextApiResponse) {
    setCookie({ res }, 'refresh-token', 'asd', { maxAge: 1 });
    setCookie({ res }, 'access-token', 'asd', { maxAge: 1 });
}
