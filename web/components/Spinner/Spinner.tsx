import React from 'react';
import { ImSpinner } from 'react-icons/im';

interface Props {
    showSpinner?: boolean;
}

const Spinner = ({ showSpinner }: Props) => {
    return (
        <div
            className={`absolute transform -translate-x-1/2 translate-y-[-40%] h-min top-1/2 left-1/2 ${
                showSpinner ? 'block' : 'hidden'
            }`}
        >
            <ImSpinner className="animate-spin" />
        </div>
    );
};

export default Spinner;
