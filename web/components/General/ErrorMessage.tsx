import React from 'react';

interface Props extends React.ComponentPropsWithoutRef<'span'> {
    text?: string;
    hidden?: boolean;
    size?: 'small' | 'base';
}

const ErrorMessage = ({ text, hidden, size, className }: Props) => {
    if (!text || hidden) return <> </>;
    return (
        <span
            className={`text-sm font-medium text-red-500 md:text-base ${
                size === 'small' ? `text-xs md:text-sm` : ``
            } ${className}`}
        >
            {text}
        </span>
    );
};

export default ErrorMessage;
