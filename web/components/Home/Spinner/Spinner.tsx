import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

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
            <FontAwesomeIcon icon={faSpinner} spin />
        </div>
    );
};

export default Spinner;
