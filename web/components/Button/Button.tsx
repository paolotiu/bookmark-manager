import React from 'react';

interface Props extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    label?: string;
    isSecondary?: boolean;
}

const Button = ({ label, children, className, isSecondary, ...props }: Props) => {
    return (
        <button
            className={`px-3 py-1 flex items-center text-sm font-bold rounded-sm  disabled:opacity-50 ${
                isSecondary ? 'text-primary border border-primary ' : 'text-white bg-primary'
            } ${className}`}
            {...props}
        >
            {label}
            {children}
        </button>
    );
};

export default Button;
