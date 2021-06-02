import React from 'react';
import { useAllBookmarksQuery } from '@graphql/generated/graphql';
import { bookmarkTitleSort } from '@lib/sortFuncs';
import { useEditing } from '@lib/useEditing';
import View from './View';
import { useDropdown } from './useDropdown';
import EditingBookmarkCard from '../EditingBookmarkCard';
import BookmarkCard from '../BookmarkCard';

const AllBookmarksView = () => {
    const { data } = useAllBookmarksQuery({});
    const { isDropdownOpen, closeDropdown, openDropdown } = useDropdown();
    const { currentEditingBookmark, stopEditing, triggerEditing } = useEditing();
    if (!data || data.bookmarks.__typename !== 'Bookmarks') return null;

    const { bookmarks } = data.bookmarks;
    const sorted = [...bookmarks].sort((a, b) => {
        if (!a || !b) return 0;
        return bookmarkTitleSort(a, b);
    });

    return (
        <View
            buttonLabel="Add +"
            buttonOnClick={openDropdown}
            title="All Bookmarks"
            withAddBookmarkDropdown
            closeDropdown={closeDropdown}
            isAddDropdownOpen={isDropdownOpen}
            folderId={null}
        >
            {sorted.map((bookmark) => {
                if (bookmark?.id === currentEditingBookmark)
                    return <EditingBookmarkCard key={bookmark.id} bookmark={bookmark} stopEditing={stopEditing} />;
                return (
                    bookmark && (
                        <BookmarkCard
                            withFolder
                            triggerEditing={triggerEditing}
                            folderId={bookmark.folderId || 0}
                            bookmark={bookmark}
                            key={bookmark?.id}
                        />
                    )
                );
            })}
        </View>
    );
};

export default AllBookmarksView;
