import React, { useEffect, useState } from 'react';
import { ObjectSchema } from 'yup';

interface ValidationError {
    errors: string[] | null;
    message: string | null;
}

const nulledValidationError = {
    errors: null,
    message: null,
};

export const useForm = <T extends Record<string, unknown>>(initialState: T, schema?: ObjectSchema<any>) => {
    const emptyObject = <T extends Record<string, unknown>>(obj: T): { [K in keyof T]: '' } => {
        return Object.fromEntries(Object.entries(obj).map(([key]) => [key, ''])) as any;
    };

    const nullifyObject = <T extends Record<string, unknown>>(obj: T): { [K in keyof T]: ValidationError } => {
        return Object.fromEntries(Object.entries(obj).map(([key]) => [key, nulledValidationError])) as any;
    };

    const [inputs, setInputs] = useState(initialState);
    const [isEmpty, setIsEmpty] = useState(true);
    const [errors, setErrors] = useState<{ [K in keyof T]: ValidationError }>(nullifyObject(initialState));
    const [isError, setIsError] = useState(true);

    const checkIfEmpty = <T extends Record<string, unknown>>(obj: T) => {
        return Object.values(obj).every((val) => val === '');
    };

    useEffect(() => {
        // Runs whenever inputs change
        const run = async () => {
            if (schema) {
                const res = await schema?.validate(inputs, { abortEarly: false }).catch((e) => e);
                if (res.name === 'ValidationError') {
                    // Validation error occurs
                    setErrors(() =>
                        res.inner.reduce(
                            (acc: any, curr: any) => ({
                                ...acc,
                                [curr.path]: { errors: curr.errors, message: curr.message },
                            }),
                            nullifyObject(inputs),
                        ),
                    );
                    setIsError(true);
                } else {
                    setErrors((prev) => nullifyObject(prev));
                    setIsError(false);
                }
            }
        };
        setIsEmpty(checkIfEmpty(inputs));

        run();
    }, [inputs, schema]);

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target;

        setInputs((prev) => ({ ...prev, [name]: value }));
    };

    const resetForm = () => {
        setInputs(initialState);
    };

    const clearForm = () => {
        setInputs(emptyObject(inputs) as T);
    };

    return { handleChange, resetForm, clearForm, inputs, isEmpty, errors, isError };
};
