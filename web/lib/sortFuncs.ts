import { Bookmark } from '@graphql/generated/graphql';

export const bookmarkTitleSort = (prev: Bookmark, curr: Bookmark) => {
    const prevLow = prev.title.toLocaleLowerCase().trim();
    const currLow = curr.title.toLocaleLowerCase().trim();
    return prevLow.localeCompare(currLow);
};

export const bookmarkDateSort = (prev: Bookmark, curr: Bookmark) => {
    const prevDate = prev.createdDate;
    const currDate = curr.createdDate;

    return prevDate > currDate ? -1 : prevDate < currDate ? 1 : 0;
};
