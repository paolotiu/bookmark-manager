import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

interface Props {
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    icon: IconDefinition;
}

const ActionButton = ({ onClick, icon }: Props) => {
    return (
        <button onClick={onClick} className={'hidden group-hover:block'}>
            <FontAwesomeIcon icon={icon} className="text-iconPassive hover:text-iconActive no-outline" />
        </button>
    );
};

export default ActionButton;
