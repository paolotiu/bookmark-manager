import React from 'react';
import { IconContext } from 'react-icons/lib';

interface Props {
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    icon: React.ReactElement;
}

const ActionButton = ({ onClick, icon }: Props) => {
    return (
        <button onClick={onClick} className="hidden group-hover:block" type="button">
            <IconContext.Provider value={{ className: 'text-iconPassive hover:text-iconActive no-outline' }}>
                {icon}
            </IconContext.Provider>
        </button>
    );
};

export default ActionButton;
