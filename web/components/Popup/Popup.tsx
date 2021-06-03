import { checkWordInSentence } from '@lib/checks';
import clsx from 'clsx';
import React, { useEffect } from 'react';
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
            type="button"
        >
            {Icon && <Icon className="text-iconPassive" size={iconSize || '20px'} />}
            <span className="pt-[3px] whitespace-nowrap">{label}</span>
        </button>
    );
};
interface PopupProps {
    style?: React.CSSProperties;
    children?: React.ReactNode;
    className?: string;
    closePopup: () => void;
}
const Popup = ({ style, children, className, closePopup }: PopupProps) => {
    useEffect(() => {
        window.addEventListener('mousedown', closePopup);

        return () => window.removeEventListener('mousedown', closePopup);
    }, [closePopup]);

    return (
        <>
            {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
            <div
                className={clsx(
                    'z-50 py-2 bg-white rounded-sm shadow-lg min-w-[200px] max-w-[90vw]',
                    {
                        'top-0': !checkWordInSentence(className, 'top'),
                        'left-0': !checkWordInSentence(className, 'left'),
                        fixed: !checkWordInSentence(className, 'absolute'),
                    },
                    className,
                )}
                style={style}
                onMouseDown={(e) => {
                    e.stopPropagation();
                }}
            >
                {children}
            </div>
        </>
    );
};

export default Object.assign(Popup, { Item });
