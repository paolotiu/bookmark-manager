import { useState } from 'react';

export const useDropdown = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const closeDropdown = () => {
        setIsDropdownOpen(false);
    };

    const openDropdown = () => [setIsDropdownOpen(true)];

    return { isDropdownOpen, closeDropdown, openDropdown };
};
