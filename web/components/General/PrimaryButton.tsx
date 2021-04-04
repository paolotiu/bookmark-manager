import React from 'react';

interface Props extends React.ComponentPropsWithoutRef<'button'> {
    text: string;
}

const PrimaryButton = ({ text, className, ...p }: Props) => {
    return (
        <button className={` py-3 text-white rounded-full outline-none bg-primary ${className || ''}`} {...p}>
            {text}
        </button>
    );
};

export default PrimaryButton;
