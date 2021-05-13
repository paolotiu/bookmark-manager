import React from 'react';

interface Props extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    label?: string;
}

const Button = ({ label, children, className, ...props }: Props) => {
    return (
        <button
            className={`px-3 py-1 flex items-center text-sm font-bold text-white rounded-sm bg-primary h-[min-content] disabled:opacity-50 ${className}`}
            {...props}
        >
            {label}
            {children}
        </button>
    );
};

export default Button;
