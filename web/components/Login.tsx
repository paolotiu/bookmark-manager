import React, { useState } from 'react';
import Google from '@assets/google.svg';
import Input from '@components/Form/Input';
import { useForm } from '@lib/useForm';
import { Divider } from 'kreme';
import { useLoginMutation } from '@graphql/generated/graphql';
import Link from 'next/link';
import ErrorMessage from './Form/ErrorMessage';
import { checkObjEqual } from '@lib/checks';
import * as yup from 'yup';
import { useRouter } from 'next/dist/client/router';
import Button from './Button/Button';
import Spinner from './Spinner/Spinner';
import clsx from 'clsx';

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
    const [isShowError, setIsShowError] = useState(false);
    const router = useRouter();

    const [loginMutation] = useLoginMutation();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsShowError(true);
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
        } else {
            setError('');
            router.push('/home/all');
        }
    };

    return (
        <div className={`p-8 pt-3   w-full sm:w-[460px] bg-white sm:border `}>
            <div className="py-4">
                <h1 className="py-4 text-2xl font-bold ">Login</h1>
                <p className="text-sm text-gray-500 ">Start organizing your bookmarks!</p>
            </div>
            <div className="pt-5 text-sm">
                <button className="flex justify-center w-full px-4 py-2 border border-gray-300 rounded-sm md:py-3 no-outline ">
                    <Google className="h-5" />
                    <span className="px-4">Log in with Google</span>
                </button>
                <div className="pb-4 font-medium pt-7">
                    <Divider text="OR" lineColor="rgba(0,0,0,.2)" textColor="rgba(0,0,0,.4)" />
                </div>
                <form onSubmit={handleSubmit} className="grid gap-6">
                    <div className="grid gap-8">
                        <div className="grid gap-3">
                            <Input
                                label="Email"
                                type="email"
                                name="email"
                                placeholder="mail@example.com"
                                onChange={handleChange}
                                value={inputs.email}
                            />

                            <ErrorMessage
                                text={errors.email.message || error || ''}
                                hidden={!isShowError}
                                size="small"
                            />
                        </div>
                        <div className="flex flex-col">
                            <Input
                                label="Password"
                                type="password"
                                name="password"
                                onChange={handleChange}
                                value={inputs.password}
                            />

                            <Link href="/">
                                <a className="self-end pt-2 text-xs font-medium transition-colors duration-200 justify-self-end hover:underline text-primary hover:text-primary-dark hover:cursor-pointer">
                                    Forgot password?
                                </a>
                            </Link>
                        </div>
                    </div>

                    <div className="relative">
                        <div
                            className={`absolute z-10 w-full h-full ${isShowError ? 'hidden' : ''}`}
                            onClick={() => setIsShowError(true)}
                        ></div>
                        <Button
                            disabled={isEmpty || isError || isSubmitting}
                            className="w-full py-2 transition-all duration-200 transform hover:bg-primary-dark disabled:opacity-50 "
                        >
                            <Spinner showSpinner={isSubmitting} />
                            <span className={clsx(isSubmitting && 'invisible')}>Log in</span>
                        </Button>
                    </div>
                    <span className="text-xs ">
                        Don&apos;t have an account?{' '}
                        <Link href="/register">
                            <a className="font-medium transition-colors duration-200 text-primary hover:underline hover:cursor-pointer hover:text-primary-dark">
                                Register
                            </a>
                        </Link>
                    </span>
                </form>
            </div>
        </div>
    );
};

export default Login;
