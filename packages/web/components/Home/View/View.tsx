import Button from '@components/Button/Button';
import React from 'react';
import AddBookmarkDropdown from '../AddBookmarkDropdown';

interface Props {
    buttonLabel: string;
    buttonOnClick: React.MouseEventHandler<HTMLButtonElement>;
    title: string;
    children?: React.ReactNode;
    withAddBookmarkDropdown?: boolean;
    isAddDropdownOpen?: boolean;
    folderId?: null | number;
}

interface WithAddBookmarkDropdownProps extends Props {
    withAddBookmarkDropdown: true;
    closeDropdown: () => void;
    folderId: null | number;
}
interface NoAddBookmarkDropdownProps extends Props {
    withAddBookmarkDropdown?: false;
    closeDropdown?: undefined;
}

const View = ({
    buttonLabel,
    buttonOnClick,
    title,
    children,
    closeDropdown,
    isAddDropdownOpen = false,
    withAddBookmarkDropdown = false,
    folderId,
}: WithAddBookmarkDropdownProps | NoAddBookmarkDropdownProps) => {
    return (
        <div>
            <div className="relative flex items-center justify-between p-3 pb-10">
                <h2 className="text-4xl font-bold text-header leading-[1.25em]">{title}</h2>
                <div className="relative">
                    <Button
                        className="relative"
                        onClick={buttonOnClick}
                        onMouseDown={(e) => {
                            e.stopPropagation();
                        }}
                    >
                        <span>{buttonLabel}</span>
                    </Button>
                    {withAddBookmarkDropdown ? (
                        <AddBookmarkDropdown
                            folderId={folderId || null}
                            isOpen={isAddDropdownOpen}
                            closeDropDown={closeDropdown || function any() {}}
                        />
                    ) : null}
                </div>
            </div>
            <div>{children}</div>
        </div>
    );
};

export default View;
