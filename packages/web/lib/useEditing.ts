import { useState } from 'react';

export const useEditing = () => {
    const [currentEditingBookmark, setCurrentEditingBookmark] = useState(0);
    const triggerEditing = (id: number) => {
        setCurrentEditingBookmark(id);
    };

    const stopEditing = () => {
        setCurrentEditingBookmark(0);
    };
    return { currentEditingBookmark, triggerEditing, stopEditing };
};
