import React from 'react';
import { ApolloCache } from '@apollo/client';
import {
    Bookmark,
    useHardDeleteBookmarkMutation,
    useSoftDeleteBookmarkMutation,
    useUpdateBookmarkMutation,
} from '@graphql/generated/graphql';
import { decode } from 'html-entities';
import { useDrag } from 'react-dnd';
import { FaPen, FaTrash } from 'react-icons/fa';
import ActionButton from './ActionButton/ActionButton';
import { useDetectDevice } from '@lib/useDetectDevice';
import Button from '@components/Button/Button';
import {
    addBookmarksToAll,
    addBookmarksToTrash,
    addBookmarksToFolder,
    removeBookmarkFromFolder,
    removeBookmarksFromAll,
    removeBookmarksFromTrash,
    useFolderCache,
} from './cacheUpdates';
import { fromUrl, parseDomain } from 'parse-domain';

interface Props {
    bookmark: Bookmark;
    hardDelete?: boolean;
    // For cache updates
    folderId: number | null;
    triggerEditing: (id: number) => void;
    isDeleted?: boolean;
    withFolder?: boolean;
}

const bookmarkSoftDeletionCacheUpdate = (cache: ApolloCache<any>, bookmark: Bookmark, folderId: number | null) => {
    if (folderId) {
        removeBookmarkFromFolder(cache, { bookmarkIds: [bookmark.id], folderId });
    }
    removeBookmarksFromAll(cache, { bookmarkIds: [bookmark.id] });
    addBookmarksToTrash(cache, { bookmarks: [bookmark] });
};
const BookmarkCard = ({
    bookmark,
    hardDelete = false,
    folderId,
    triggerEditing,
    isDeleted,
    withFolder = false,
}: Props) => {
    const [, drag] = useDrag(() => ({
        type: 'Bookmark',
        item: bookmark,
    }));

    const device = useDetectDevice();
    const [softDeleteBookmark] = useSoftDeleteBookmarkMutation({
        update(cache) {
            bookmarkSoftDeletionCacheUpdate(cache, bookmark, folderId);
        },
    });
    const [hardDeleteBookmark] = useHardDeleteBookmarkMutation({
        update(cache) {
            cache.evict({ id: cache.identify({ __typename: 'Bookmark', id: bookmark.id }) });
        },
    });

    const { folder } = useFolderCache(bookmark.folderId || 0);

    const [restoreBookmark] = useUpdateBookmarkMutation({
        variables: { data: { id: bookmark.id, restore: true } },
        update(cache, { data }) {
            // Update folder where bookmark will get restored
            if (data?.updateBookmark.__typename === 'Bookmark' && data.updateBookmark.folderId) {
                addBookmarksToFolder(cache, {
                    bookmarks: [data.updateBookmark],
                    folderId: data.updateBookmark.folderId,
                });
            }

            // Update trash
            removeBookmarksFromTrash(cache, { bookmarkIds: [bookmark.id] });
            // Update All Page
            addBookmarksToAll(cache, { bookmarks: [bookmark] });
        },
    });

    const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (hardDelete) {
            await hardDeleteBookmark({ variables: { id: bookmark.id } });
        }
        await softDeleteBookmark({ variables: { id: bookmark.id } });
    };

    const handleEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        triggerEditing(bookmark.id);
    };

    return (
        <a
            href={bookmark.url}
            rel="noreferrer"
            target="_blank"
            className="relative block overflow-hidden border-b border-gray-200 hover:bg-gray-50 group"
            ref={device.isDesktop() ? drag : undefined}
        >
            <div className="grid gap-2 p-3 ">
                <div className="grid justify-between pr-4 bookmark-card-header grid-cols-[1fr] sm:grid-cols-[8fr,1fr]">
                    <h3 className="pr-5 text-base font-medium sm:line-clamp-3 line-clamp-2 ">
                        {decode(bookmark.title)}
                    </h3>

                    <div
                        className={`absolute items-stretch justify-around hidden p-3 space-x-4 sm:space-x-1 bg-white shadow-md sm:bg-transparent sm:shadow-none sm:p-0 sm:static group-hover:flex  sm:flex right-3`}
                    >
                        {isDeleted ? (
                            <Button
                                isSecondary
                                className="border-none text-inputGrayText"
                                onClick={(e) => {
                                    e.preventDefault();
                                    restoreBookmark();
                                }}
                            >
                                Restore
                            </Button>
                        ) : (
                            <>
                                <ActionButton onClick={handleDelete} icon={<FaTrash />} />
                                <ActionButton onClick={handleEdit} icon={<FaPen />} />
                            </>
                        )}
                    </div>
                </div>
                <p className="text-sm leading-5 line-clamp-3">{decode(bookmark.description)}</p>
                <div className="flex w-full space-x-2 text-xs text-gray-400">
                    {withFolder ? (
                        <>
                            <span>{folder?.name || '<No-Folder>'} </span>
                            <span>-</span>
                        </>
                    ) : null}
                    <span className="line-clamp-1" style={{ wordBreak: 'break-all' }}>
                        {parseDomain(fromUrl(bookmark.url)).hostname}
                    </span>
                    <span>-</span>
                    <span className="whitespace-nowrap">{new Date(bookmark.createdDate).toDateString()} </span>
                </div>
            </div>
        </a>
    );
};

export default BookmarkCard;
