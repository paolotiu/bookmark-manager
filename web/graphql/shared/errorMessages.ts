import { BaseError, InputValidationError } from '@graphql/generated/graphql';
import { ValidationError } from 'yup';

export const createBaseError = (path: string, message: string): BaseError => ({
    path,
    message,
});

export const createValidationError = (path: string, validationError: ValidationError): InputValidationError => {
    const errors = validationError.inner.map((error) => ({
        path: error.path || '',
        message: error.message,
    }));

    return { path, errors };
};

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
    return !!obj && (obj as BaseError).message !== undefined && (obj as BaseError).path !== undefined;
}

export const isValidationError = (obj: unknown): obj is InputValidationError => {
    return (
        !!obj && (obj as InputValidationError) !== undefined && isBaseError((obj as InputValidationError).errors?.[0])
    );
};
