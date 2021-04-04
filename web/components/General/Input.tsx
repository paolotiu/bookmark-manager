import React from 'react';

interface InputProps extends React.ComponentPropsWithoutRef<'input'> {
    label: string;
    type: string;
    name: string;
    placeholder?: string;
}

const Input = ({ label, type, name, placeholder = '', className, ...p }: InputProps) => {
    return (
        <div className='grid gap-3'>
            <label className='text-lg font-medium' htmlFor={name}>
                {label}
            </label>
            <input
                type={type}
                placeholder={placeholder}
                name={name}
                className={`w-full px-5 py-2 border focus:ring-1 ring-primary  outline-none border-gray-300 rounded-full md:py-3 ${className}`}
                {...p}
            />
        </div>
    );
};

export default Input;
