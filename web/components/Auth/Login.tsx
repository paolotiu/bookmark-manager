import React, { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import Input from '@components/Form/Input';
import { useForm } from '@lib/useForm';
import { useLoginMutation } from '@graphql/generated/graphql';
import Link from 'next/link';
import { checkObjEqual } from '@lib/checks';
import * as yup from 'yup';
import { useRouter } from 'next/router';
import Auth from './Auth';

// Inital form state
const initialState = {
    email: '',
    password: '',
};

const schema = yup.object().shape({
    email: yup.string().email('Not a valid email').required('Email is required'),
    password: yup.string().min(2),
});

const Login = () => {
    const { handleChange, inputs, isEmpty, isError, errors } = useForm(initialState, schema);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [lastInputs, setLastInputs] = useState(initialState);
    const [error, setError] = useState('');
    const [willShowErrors, setWillShowErrors] = useState(false);
    const router = useRouter();

    const [loginMutation] = useLoginMutation();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setWillShowErrors(true);
        setIsSubmitting(true);
        // To prevent multiple server calls
        if (checkObjEqual(lastInputs, inputs)) {
            setIsSubmitting(false);
            return;
        }

        // Update previous inputs
        setLastInputs(inputs);

        const { data } = await loginMutation({ variables: inputs });

        if (data?.login?.__typename === 'BaseError') {
            // Wrong email/password
            setError(data.login.message);
            setIsSubmitting(false);
            return;
        }

        setError('');
        router.push('/home/all');
    };

    return (
        <Auth title="Log in" subtitle="Start collection bookmarks now!">
            <Auth.SocialButton Icon={<FcGoogle size="16px" />} label="Log in with Google" />

            <Auth.Divider />
            <Auth.Form handleSubmit={handleSubmit}>
                <Auth.Input
                    label="Email"
                    type="email"
                    name="email"
                    onChange={handleChange}
                    value={inputs.email}
                    errorMessage={error || errors.email.message}
                    isErrorShown={willShowErrors}
                />
                <div className="flex flex-col">
                    <Input
                        label="Password"
                        type="password"
                        name="password"
                        onChange={handleChange}
                        value={inputs.password}
                    />

                    <Link href="/forgot" passHref>
                        <a
                            className="self-end pt-2 text-xs font-medium transition-colors duration-200 justify-self-end hover:underline text-primary hover:text-primary-dark hover:cursor-pointer"
                            href="forgot"
                        >
                            Forgot password?
                        </a>
                    </Link>
                </div>

                <div className="space-y-2">
                    <Auth.Submit
                        label="Log in"
                        isSubmitting={isSubmitting}
                        showSpinner={isSubmitting}
                        disabled={isEmpty || isError || isSubmitting}
                        disabledClick={() => setWillShowErrors(true)}
                    />
                    <div className="text-xs">
                        Don&apos;t have an account?{' '}
                        <Link href="/register" passHref>
                            <a
                                className="font-medium transition-colors duration-200 text-primary hover:underline hover:cursor-pointer hover:text-primary-dark"
                                href="register"
                            >
                                Register
                            </a>
                        </Link>
                    </div>
                </div>
            </Auth.Form>
        </Auth>
    );
};

export default Login;
