import { BaseError, InputValidationError } from './generated/graphql';

export function isBaseError(obj: unknown): obj is BaseError {
    return !!obj && typeof (obj as BaseError).message === 'string' && typeof (obj as BaseError).path === 'string';
}

export const isValidationError = (obj: unknown) => {
    return (
        !!obj &&
        typeof (obj as InputValidationError).path === 'string' &&
        isBaseError((obj as InputValidationError).errors[0])
    );
};
