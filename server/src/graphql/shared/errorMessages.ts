import { BaseError } from '@gql/types';
export const unauthorizedError = (path: string): BaseError => ({
    path,
    message: 'Unauthorized',
});

export function isBaseError(obj: unknown): obj is BaseError {
    return (obj as BaseError).message !== undefined && (obj as BaseError).path !== undefined;
}
