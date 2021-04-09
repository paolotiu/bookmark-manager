import { BaseError } from '@gql/types';

export const createBaseError = (path: string, message: string): BaseError => ({
    path,
    message,
});

export const createEntityIdNotFoundError = (path: string, entity: string): BaseError => ({
    path,
    message: `No ${entity} with that id`,
});

export const createUnexpectedError = (path: string): BaseError => ({
    path,
    message: 'An unexpected error has occured',
});
export const unauthorizedError = (path: string): BaseError => ({
    path,
    message: 'Unauthorized',
});

export function isBaseError(obj: unknown): obj is BaseError {
    return (obj as BaseError).message !== undefined && (obj as BaseError).path !== undefined;
}
