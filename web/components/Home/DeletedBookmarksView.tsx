import Button from '@components/Button/Button';
import { useDeletedBookmarksQuery, useHardDeleteBookmarksMutation } from '@graphql/generated/graphql';
import { useEditing } from '@lib/useEditing';
import React from 'react';
import BookmarkCard from './BookmarkCard';
import EditingBookmarkCard from './EditingBookmarkCard';

const DeletedBookmarksView = () => {
    const { data } = useDeletedBookmarksQuery();
    const [hardDeleteBookmarks] = useHardDeleteBookmarksMutation({
        update(cache, { data }) {
            if (data?.hardDeleteBookmarks.__typename === 'Bookmarks') {
                data.hardDeleteBookmarks.bookmarks.forEach((bookmark) => {
                    cache.evict({ id: cache.identify({ id: bookmark?.id, __typename: 'Bookmark' }) });
                });
            }
        },
    });
    const { currentEditingBookmark, stopEditing, triggerEditing } = useEditing();

    if (!data || data.bookmarks.__typename !== 'Bookmarks') return null;

    const { bookmarks } = data.bookmarks;
    const handleBatchDelete = async () => {
        await hardDeleteBookmarks({ variables: { ids: bookmarks.map((bookmark) => bookmark?.id || -1) } });
    };
    return (
        <div>
            <div className="relative flex items-center justify-between p-3 pb-10">
                <h2 className="text-4xl font-bold text-header">Trash</h2>
                <div className="relative">
                    <Button className="relative" onClick={handleBatchDelete}>
                        <span>Delete All</span>
                    </Button>
                </div>
            </div>
            <div>
                {bookmarks.map((bookmark) => {
                    if (bookmark?.id === currentEditingBookmark)
                        return <EditingBookmarkCard bookmark={bookmark} stopEditing={stopEditing} key={bookmark.id} />;
                    return (
                        bookmark && (
                            <BookmarkCard
                                isDeleted
                                triggerEditing={triggerEditing}
                                folderId={1}
                                hardDelete
                                bookmark={bookmark}
                                key={bookmark?.id}
                            />
                        )
                    );
                })}
            </div>
        </div>
    );
};

export default DeletedBookmarksView;
