import React, { useCallback, useState } from 'react';
import { useAllBookmarksQuery } from '@graphql/generated/graphql';
import BookmarkCard from './BookmarkCard';
import AddBookmarkDropdown from './AddBookmarkDropdown';
import Button from '@components/Button/Button';
import { bookmarkDateSort, bookmarkTitleSort } from '@lib/sortFuncs';

const AllBookmarksView = () => {
    const { data, refetch } = useAllBookmarksQuery({});
    const [isOpen, setIsOpen] = useState(false);
    const closeDropdown = useCallback(() => setIsOpen(false), []);
    if (!data || data.bookmarks.__typename !== 'Bookmarks') return null;

    const { bookmarks } = data.bookmarks;
    const sorted = [...bookmarks].sort((a, b) => {
        if (!a || !b) return 0;
        return bookmarkDateSort(a, b);
    });
    return (
        <div>
            <div className="relative flex items-center justify-between p-3 pb-10">
                <h2 className="text-4xl font-bold text-header">All Bookmarks</h2>
                <div className="relative">
                    <Button
                        className="relative"
                        onClick={() => {
                            setIsOpen(true);
                        }}
                        onMouseDown={(e) => {
                            e.stopPropagation();
                        }}
                    >
                        <span>Add +</span>
                    </Button>
                    <AddBookmarkDropdown
                        folderId={null}
                        isOpen={isOpen}
                        onSubmit={refetch}
                        closeDropDown={closeDropdown}
                    />
                </div>
            </div>
            <div>
                {sorted.map((bookmark) => {
                    return (
                        bookmark && (
                            <BookmarkCard folderId={bookmark.folderId || 0} bookmark={bookmark} key={bookmark?.id} />
                        )
                    );
                })}
            </div>
        </div>
    );
};

export default AllBookmarksView;
