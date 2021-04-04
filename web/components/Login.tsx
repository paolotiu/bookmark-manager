import React, { useState } from 'react';
import Google from '@assets/google.svg';
import { Divider } from 'tiu-ui';
import PrimaryButton from '@components/General/PrimaryButton';
import Input from '@components/General/Input';
import { useForm } from '@lib/useForm';
import { useLoginMutation } from '@graphql/generated/graphql';
import Link from 'next/link';
import ErrorMessage from './General/ErrorMessage';
import { checkObjEqual } from '@lib/checkObjEqual';

// Inital form state
const initialState = {
    email: '',
    password: '',
};

const Login = ({ className, ...p }: React.ComponentPropsWithoutRef<'div'>) => {
    const { handleChange, inputs } = useForm(initialState);
    const [lastInputs, setLastInputs] = useState(initialState);
    const [error, setError] = useState('');

    const [loginMutation] = useLoginMutation();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // To prevent multiple server calls
        if (checkObjEqual(lastInputs, inputs)) return;

        // Update cahced inputs
        setLastInputs(inputs);

        const { data } = await loginMutation({ variables: inputs });

        if (data?.login?.__typename === 'BaseError') {
            // Wrong email/password
            setError(data.login.message);
        } else {
            setError('');
            // Do stuff
        }
    };

    return (
        <div className={`p-8 ${className || ''}`} {...p}>
            <div className='py-4'>
                <h1 className='py-4 text-4xl font-bold md:text-5xl'>Login</h1>
                <p className='text-sm text-gray-500 md:text-lg'>Start organizing your bookmarks!</p>
            </div>
            <div className='pt-5'>
                <button className='flex justify-center w-full px-4 py-2 border border-gray-300 rounded-full md:py-3 no-outline '>
                    <Google className='h-5' />
                    <span className='px-4'>Sign in with Google</span>
                </button>
                <div className='text-xs font-medium py-7'>
                    <Divider text='or Sign in with Email' lineColor='rgba(0,0,0,.2)' textColor='rgba(0,0,0,.4)' />
                </div>
                <form onSubmit={handleSubmit} className='grid gap-5'>
                    <div className='grid gap-8'>
                        <Input
                            label='Email'
                            type='email'
                            name='email'
                            placeholder='mail@example.com'
                            onChange={handleChange}
                            value={inputs.email}
                        />
                        <Input
                            label='Password'
                            type='password'
                            name='password'
                            placeholder='Min. of 8 characters'
                            onChange={handleChange}
                            value={inputs.password}
                        />
                    </div>

                    <ErrorMessage text={error} />
                    <Link href='/'>
                        <a className='text-sm font-medium transition-colors duration-200 justify-self-end hover:underline text-primary hover:text-primary-dark md:text-base hover:cursor-pointer'>
                            Forgot password?
                        </a>
                    </Link>
                    <PrimaryButton
                        text='Login'
                        className='transition-all duration-200 transform hover:bg-primary-dark'
                    />
                    <span className='text-sm md:text-base'>
                        Already have an account?{' '}
                        <Link href='/register'>
                            <a className='font-medium transition-colors duration-200 text-primary hover:underline hover:cursor-pointer hover:text-primary-dark'>
                                Log In
                            </a>
                        </Link>
                    </span>
                </form>
            </div>
        </div>
    );
};

export default Login;
