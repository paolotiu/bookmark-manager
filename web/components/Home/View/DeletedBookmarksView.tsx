import { useDeletedBookmarksQuery, useHardDeleteBookmarksMutation } from '@graphql/generated/graphql';
import { useEditing } from '@lib/useEditing';
import React from 'react';
import BookmarkCard from '../BookmarkCard';
import EditingBookmarkCard from '../EditingBookmarkCard';
import View from './View';

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
        <View buttonLabel="Delete All" buttonOnClick={handleBatchDelete} title="Trash">
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
        </View>
    );
};

export default DeletedBookmarksView;
