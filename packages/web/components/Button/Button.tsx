import clsx from 'clsx';
import React from 'react';

export interface ButtonProps
    extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    label?: string;
    isSecondary?: boolean;
}

const Button = ({ label, children, className, isSecondary, ...props }: ButtonProps) => {
    return (
        <button type="button" className={clsx('btn', isSecondary && 'btn-secondary', className)} {...props}>
            {label}
            {children}
        </button>
    );
};

export default Button;
