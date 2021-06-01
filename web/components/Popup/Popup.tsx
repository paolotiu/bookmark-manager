import React from 'react';
import { IconType } from 'react-icons';

interface PopupItemProps {
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    Icon?: IconType;
    label: string;
    iconSize?: string;
}
const Item = ({ onClick, Icon, label, iconSize }: PopupItemProps) => {
    return (
        <button
            className="relative w-full grid items-center grid-flow-col gap-2 px-2 py-1 grid-cols-[20px,min-content] text-sm hover:bg-hoverColor"
            onClick={onClick}
        >
            {Icon && <Icon className="text-iconPassive" size={iconSize || '20px'} />}
            <span className="pt-[3px] whitespace-nowrap">{label}</span>
        </button>
    );
};
interface PopupProps {
    style?: React.CSSProperties;
    children?: React.ReactNode;
}

const Popup = ({ style, children }: PopupProps) => {
    return (
        <div
            className="fixed top-0 left-0 z-50 py-2 bg-white rounded-sm shadow-lg min-w-[200px] max-w-[90vw]"
            style={style}
            onMouseDown={(e) => {
                e.stopPropagation();
            }}
        >
            {children}
        </div>
    );
};

export default Object.assign(Popup, { Item });
