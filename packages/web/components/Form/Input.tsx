import React from 'react';

export interface InputProps extends React.ComponentPropsWithoutRef<'input'> {
    label: string;
    type: string;
    name: string;
    placeholder?: string;
}

const Input = ({ label, type, name, placeholder = '', className, ...p }: InputProps) => {
    return (
        <div className="grid gap-2">
            <label className="font-medium" htmlFor={name}>
                {label}
            </label>
            <input
                type={type}
                placeholder={placeholder}
                name={name}
                className={`w-full px-3 py-2 border focus:ring-1 ring-primary  outline-none border-gray-300 rounded-sm  ${className}`}
                {...p}
            />
        </div>
    );
};

export default Input;
