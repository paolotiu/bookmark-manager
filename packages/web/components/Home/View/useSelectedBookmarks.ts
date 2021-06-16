import { useState } from 'react';

export const useSelectedBookmarks = () => {
    const [selectedBookmarks, setSelectedBookmarks] = useState<number[]>([]);
    const addToSelected = (id: number) => {
        setSelectedBookmarks((prev) => [...prev, id]);
    };

    const removedFromSelected = (id: number) => {
        setSelectedBookmarks((prev) => prev.filter((bid) => bid !== id));
    };
    return { selectedBookmarks, addToSelected, removedFromSelected };
};
