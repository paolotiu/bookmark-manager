import { useForm } from '@lib/useForm';
import React, { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import * as yup from 'yup';
import { useRegisterMutation } from '@graphql/generated/graphql';
import Link from 'next/link';
import Auth from './Auth';

const schema = yup.object().shape({
    name: yup.string().min(1).required('Name is required'),
    email: yup.string().email('Not a valid email').required('Email is required'),
    password: yup.string().min(8).required('Password is required'),
});

const Register = () => {
    const { inputs, handleChange, errors, isEmpty, isError } = useForm({ name: '', password: '', email: '' }, schema);
    const [error, setError] = useState('');
    const [willShowErrors, setWillShowErrors] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [register] = useRegisterMutation();

    const handleSubmit: React.FormEventHandler = async (e) => {
        e.preventDefault();

        setWillShowErrors(true);
        setIsSubmitting(true);

        const { data } = await register({ variables: inputs });
        if (data?.register.__typename === 'BaseError') {
            setError(data.register.message);
            setIsSubmitting(false);
            return;
        }
        setError('');
    };

    return (
        <Auth title="Register">
            <Auth.SocialButton Icon={<FcGoogle size="16px" />} label="Continue with Google" />

            <Auth.Divider />
            <Auth.Form handleSubmit={handleSubmit}>
                <Auth.Input
                    label="Name"
                    name="name"
                    type="text"
                    onChange={handleChange}
                    value={inputs.name}
                    errorMessage={errors.name.message}
                    isErrorShown={willShowErrors}
                />
                <Auth.Input
                    label="Email"
                    name="email"
                    type="email"
                    onChange={handleChange}
                    value={inputs.email}
                    errorMessage={errors.email.message}
                    isErrorShown={willShowErrors}
                />

                <Auth.Input
                    label="Password"
                    name="password"
                    type="password"
                    onChange={handleChange}
                    value={inputs.password}
                    errorMessage={error || errors.password.message}
                    isErrorShown={willShowErrors}
                />
                <div className="space-y-2">
                    <Auth.Submit
                        label="Register"
                        disabled={isSubmitting || isError || isEmpty}
                        disabledClick={() => setWillShowErrors(true)}
                        isSubmitting={isSubmitting}
                        showSpinner={isSubmitting}
                    />
                    <div className="text-xs ">
                        Already have an account?{' '}
                        <Link href="/login" passHref>
                            <a
                                className="font-medium transition-colors duration-200 text-primary hover:underline hover:cursor-pointer hover:text-primary-dark"
                                href="login"
                            >
                                Log in
                            </a>
                        </Link>
                    </div>
                </div>
            </Auth.Form>
        </Auth>
    );
};

export default Register;
