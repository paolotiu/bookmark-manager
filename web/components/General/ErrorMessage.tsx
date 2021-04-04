import React from 'react';

interface Props extends React.ComponentPropsWithoutRef<'span'> {
    text?: string;
}

const ErrorMessage = ({ text }: Props) => {
    if (!text) return <> </>;
    return <span className='text-sm font-medium text-red-500 md:text-base'>{text}</span>;
};

export default ErrorMessage;
