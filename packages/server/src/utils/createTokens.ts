import { User } from '@entity/User';
import jwt from 'jsonwebtoken';

export const createTokens = (
    user: User,
): {
    refreshToken: string;
    accessToken: string;
} => {
    const refreshToken = jwt.sign({ userId: user.id, count: user.count }, process.env.JWT_SECRET as string, {
        expiresIn: '7d',
    });
    const accessToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET as string, { expiresIn: '15min' });
    return { refreshToken, accessToken };
};
