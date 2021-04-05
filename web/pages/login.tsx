import Login from '@components/Login';
import React from 'react';

import Test from '@assets/loginAssets/hero.svg';

const login = () => {
    return (
        <div className='h-screen md:flex md:justify-between'>
            <Login className='self-center w-full max-w-4xl lg:w-1/2 md:px-32 lg:pl-20 lg:pr-24 xl:pl-32 4xl:pl-72 4xl:pr-0' />
            <div className='relative hidden w-full bg-white lg:block lg:w-1/2'>
                <div className='absolute right-0 flex justify-end w-full h-screen '>
                    <Test className='max-h-full bg-primary ' />
                </div>
            </div>
        </div>
    );
};

export default login;
