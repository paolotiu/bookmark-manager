import Login from '@components/Login';
import React from 'react';

const login = () => {
    return (
        <div className='h-screen md:flex md:justify-between '>
            <Login className='w-full lg:w-1/2 md:self-center md:pb-40 md:px-32 lg:pl-20 lg:pr-24 xl:pl-32 xl:pr-40 ' />
            <div className='bg-black lg:w-1/2'></div>
        </div>
    );
};

export default login;
