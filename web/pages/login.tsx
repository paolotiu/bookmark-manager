import Login from '@components/Login';
import React from 'react';
import dynamic from 'next/dynamic';

const Test: any = dynamic(() => import('@assets/loginAssets/hero.svg'));

const login = () => {
    return (
        <div className='h-screen md:flex md:justify-between'>
            <Login className='self-center w-full max-w-4xl lg:w-1/2 md:px-32 lg:pl-20 lg:pr-24 xl:pl-32 4xl:pl-72 4xl:pr-0' />
            <div className='relative items-stretch hidden bg-white lg:grid lg:w-1/2'>
                <div className='right-0 grid h-screen place-items-center bg-primary 1665:bg-transparent'>
                    <Test className='w-auto max-h-full ' />
                </div>
            </div>
        </div>
    );
};

export default login;
