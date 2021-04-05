import React from 'react';

interface Props extends React.ComponentPropsWithoutRef<'span'> {
    text?: string;
    hidden?: boolean;
}

const ErrorMessage = ({ text, hidden }: Props) => {
    if (!text || hidden) return <> </>;
    return <span className='text-sm font-medium text-red-500 md:text-base'>{text}</span>;
};

export default ErrorMessage;
