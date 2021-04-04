import React, { useEffect, useState } from 'react';

export const useForm = <T extends Record<string, unknown>>(initialState: T) => {
    const [inputs, setInputs] = useState(initialState);
    const [isEmpty, setIsEmpty] = useState(true);

    useEffect(() => {
        setIsEmpty(Object.values(inputs).every((val) => val === ''));
    }, [inputs]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target;

        setInputs((prev) => ({ ...prev, [name]: value }));
    };

    const resetForm = () => {
        setInputs(initialState);
    };

    const clearForm = () => {
        setInputs(Object.fromEntries(Object.entries(inputs).map(([key]) => [key, ''])) as T);
    };

    return { handleChange, resetForm, clearForm, inputs, isEmpty };
};
