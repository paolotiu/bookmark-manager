import { useRequestForgotMutation } from '@graphql/generated/graphql';
import { useForm } from '@lib/useForm';
import Link from 'next/link';
import React, { useState } from 'react';
import Auth from './Auth';

const Forgot = () => {
    const { inputs, handleChange } = useForm({ email: '' });
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isDone, setIsDone] = useState(false);
    const [requestForgot] = useRequestForgotMutation();

    const handleSubmit: React.FormEventHandler = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const { data } = await requestForgot({ variables: inputs });
        if (!data?.sendForgotPassword) {
            setError('Invalid Email');
            setIsSubmitting(false);
            return;
        }

        setIsDone(true);
    };
    return (
        <Auth title="Forgot Password">
            {isDone ? (
                <p>A password reset link has been sent to your email.</p>
            ) : (
                <Auth.Form handleSubmit={handleSubmit} inputsClassName="gap-2">
                    <Auth.Input
                        type="email"
                        name="email"
                        value={inputs.email}
                        label="Email"
                        onChange={handleChange}
                        errorMessage={error}
                        isErrorShown={!!error}
                    />
                    <Auth.Submit label="Reset Password" isSubmitting={isSubmitting} />
                </Auth.Form>
            )}
            <div className="py-6">
                <hr />
            </div>

            <div className="text-center">
                <Link href="/login">
                    <a className="text-primary hover:underline">Login</a>
                </Link>
            </div>
        </Auth>
    );
};

export default Forgot;
