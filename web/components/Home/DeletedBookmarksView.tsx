import { useDeletedBookmarksQuery } from '@graphql/generated/graphql';
import React from 'react';
import BookmarkCard from './BookmarkCard';

const DeletedBookmarksView = () => {
    const { data } = useDeletedBookmarksQuery({ fetchPolicy: 'cache-and-network' });

    if (!data || data.bookmarks.__typename !== 'Bookmarks') return null;
    const { bookmarks } = data.bookmarks;
    return (
        <div>
            <div className="relative flex items-center justify-between p-3 pb-10">
                <h2 className="text-4xl font-bold text-header">Trash</h2>
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
