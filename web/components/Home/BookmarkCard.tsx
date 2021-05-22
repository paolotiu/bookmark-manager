import { ApolloCache } from '@apollo/client';
import { cloneDeep } from 'lodash';
import { Bookmark, useHardDeleteBookmarkMutation, useSoftDeleteBookmarkMutation } from '@graphql/generated/graphql';
import { decode } from 'html-entities';
import { useDrag } from 'react-dnd';
import { FaTrash } from 'react-icons/fa';
import ActionButton from './ActionButton/ActionButton';

interface Props {
    bookmark: Bookmark;
    hardDelete?: boolean;
    // For cache updates
    folderId: number | null;
}

const bookmarkSoftDeletionCacheUpdate = (cache: ApolloCache<any>, bookmarkId: number, folderId: number) => {
    cache.modify({
        id: cache.identify({ __typename: 'Folder', id: folderId }),
        fields: {
            bookmarks(existingBookmarksRef = [], { readField }) {
                return existingBookmarksRef.filter((bookmarkRef: any) => bookmarkId !== readField('id', bookmarkRef));
            },
        },
    });
    cache.modify({
        id: 'ROOT_QUERY',
        fields: {
            bookmarks(existingBookmarks, { readField }) {
                const clone = cloneDeep(existingBookmarks);
                clone.bookmarks = existingBookmarks.bookmarks.filter(
                    (bookmarkRef: any) => bookmarkId !== readField('id', bookmarkRef),
                );
                return clone;
            },
        },
    });
};
const BookmarkCard = ({ bookmark, hardDelete = false, folderId }: Props) => {
    const [, drag] = useDrag(() => ({
        type: 'Bookmark',
        item: bookmark,
    }));
    const [softDeleteBookmark] = useSoftDeleteBookmarkMutation({
        update(cache) {
            if (folderId) {
                bookmarkSoftDeletionCacheUpdate(cache, bookmark.id, folderId);
            }
        },
    });
    const [hardDeleteBookmark] = useHardDeleteBookmarkMutation({
        update(cache) {
            cache.evict({ id: cache.identify({ __typename: 'Bookmark', id: bookmark.id }) });
        },
    });

    const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (hardDelete) {
            await hardDeleteBookmark({ variables: { id: bookmark.id } });
        }
        await softDeleteBookmark({ variables: { id: bookmark.id } });
    };
    return (
        <a
            href={bookmark.url}
            rel="noreferrer"
            target="_blank"
            className="relative block border-b border-gray-200 hover:bg-gray-50 group"
            ref={drag}
        >
            <div className="grid gap-2 p-3">
                <div className="grid justify-between pr-4" style={{ gridTemplateColumns: '8fr 1fr' }}>
                    <h3 className="pr-5 text-base font-medium line-clamp-3 ">{decode(bookmark.title)}</h3>

                    <div className="flex items-start justify-around">
                        <ActionButton onClick={handleDelete} icon={<FaTrash />} />
                    </div>
                </div>
                <p className="text-sm leading-5 line-clamp-3">{decode(bookmark.description)}</p>
                <div className="flex">
                    <span className="text-xs text-gray-400">{bookmark.url} &nbsp;</span>

                    <span className="text-xs text-gray-400">{new Date(bookmark.createdDate).toDateString()}</span>
                </div>
            </div>
        </a>
    );
};

export default BookmarkCard;
