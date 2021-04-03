import { useLoginMutation } from '@graphql/generated/graphql';
import React from 'react';
import { useForm } from '../lib/useForm';

const login = () => {
    const { handleChange, inputs } = useForm({
        email: 'sadsa',
        password: 'asdsad',
    });
    const [loginMutation] = useLoginMutation();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { data } = await loginMutation({ variables: inputs });
        console.log(data);
    };
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="email" name="email" onChange={handleChange} value={inputs.email} />
                <input type="password" name="password" onChange={handleChange} value={inputs.password} />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default login;
