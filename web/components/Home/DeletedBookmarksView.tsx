import Button from '@components/Button/Button';
import { useDeletedBookmarksQuery, useHardDeleteBookmarksMutation } from '@graphql/generated/graphql';
import React from 'react';
import BookmarkCard from './BookmarkCard';

const DeletedBookmarksView = () => {
    const { data } = useDeletedBookmarksQuery({ fetchPolicy: 'cache-and-network' });
    const [hardDeleteBookmarks] = useHardDeleteBookmarksMutation({
        update(cache, { data }) {
            if (data?.hardDeleteBookmarks.__typename === 'Bookmarks') {
                data.hardDeleteBookmarks.bookmarks.forEach((bookmark) => {
                    cache.evict({ id: cache.identify({ id: bookmark?.id, __typename: 'Bookmark' }) });
                });
            }
        },
    });

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
                    return bookmark && <BookmarkCard folderId={1} hardDelete bookmark={bookmark} key={bookmark?.id} />;
                })}
            </div>
        </div>
    );
};

export default DeletedBookmarksView;
