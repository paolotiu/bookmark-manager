import { ApolloCache } from '@apollo/client';
import { ALL_BOOKMARKS_QUERY, DELETED_BOOMARKS } from '@graphql/bookmark/operations';
import { FOLDER } from '@graphql/folder/folderQuery';
import { Bookmark, BookmarksResult, FolderResult } from '@graphql/generated/graphql';

interface AddBookmarkToFolderOptions {
    folderId: number;
    bookmarks: Bookmark[];
}
export const addBookmarksToFolder = <CacheType>(
    cache: ApolloCache<CacheType>,
    { folderId, bookmarks }: AddBookmarkToFolderOptions,
) => {
    // Update target folder cache
    const targetFolder = cache.readQuery({
        query: FOLDER,
        variables: { id: folderId },
    }) as { folder: FolderResult } | null;

    if (targetFolder?.folder.__typename === 'Folder' && targetFolder.folder.bookmarks) {
        cache.writeQuery({
            query: FOLDER,
            data: {
                folder: {
                    ...targetFolder.folder,

                    bookmarks: [...targetFolder.folder.bookmarks, ...bookmarks],
                },
            },
            variables: {
                id: folderId,
            },
        });
    }
};

interface RemoveBookmarksFromFolderOptions {
    folderId: number;
    bookmarkIds: number[];
}

export const removeBookmarkFromFolder = <CacheType>(
    cache: ApolloCache<CacheType>,
    { bookmarkIds, folderId }: RemoveBookmarksFromFolderOptions,
) => {
    // Evict from this folder
    cache.modify({
        id: cache.identify({ __typename: 'Folder', id: folderId }),
        fields: {
            bookmarks(existingBookmarksRef = [], { readField }) {
                return existingBookmarksRef.filter(
                    (bookmarkRef: any) => !bookmarkIds.includes(readField('id', bookmarkRef) || 0),
                );
            },
        },
    });
};

interface AddBookmarksToAllOptions {
    bookmarks: Bookmark[];
}
export const addBookmarksToAll = <CacheType>(
    cache: ApolloCache<CacheType>,
    { bookmarks }: AddBookmarksToAllOptions,
) => {
    const all = cache.readQuery({ query: ALL_BOOKMARKS_QUERY }) as { bookmarks: BookmarksResult } | null;
    if (all?.bookmarks.__typename === 'Bookmarks') {
        cache.writeQuery({
            query: ALL_BOOKMARKS_QUERY,
            data: {
                bookmarks: {
                    ...all.bookmarks,
                    bookmarks: [...all.bookmarks.bookmarks, ...bookmarks],
                },
            },
        });
    }
};

interface RemoveBookmarksFromAllOptions {
    bookmarkIds: number[];
}
export const removeBookmarksFromAll = <CacheType>(
    cache: ApolloCache<CacheType>,
    { bookmarkIds }: RemoveBookmarksFromAllOptions,
) => {
    const all = cache.readQuery({ query: ALL_BOOKMARKS_QUERY }) as { bookmarks: BookmarksResult } | null;
    if (all?.bookmarks.__typename === 'Bookmarks') {
        cache.writeQuery({
            query: ALL_BOOKMARKS_QUERY,
            data: {
                bookmarks: {
                    ...all.bookmarks,
                    bookmarks: all.bookmarks.bookmarks.filter((b) => !bookmarkIds.includes(b?.id || 0)),
                },
            },
        });
    }
};

interface AddBookmarksToTrashOptions {
    bookmarks: Bookmark[];
}

export const addBookmarksToTrash = <CacheType>(
    cache: ApolloCache<CacheType>,
    { bookmarks }: AddBookmarksToTrashOptions,
) => {
    const trash = cache.readQuery({ query: DELETED_BOOMARKS }) as { bookmarks: BookmarksResult } | null;
    if (trash?.bookmarks.__typename === 'Bookmarks') {
        cache.writeQuery({
            query: DELETED_BOOMARKS,
            data: {
                bookmarks: {
                    ...trash.bookmarks,
                    bookmarks: [...trash.bookmarks.bookmarks, ...bookmarks],
                },
            },
        });
    }
};

interface RemoveBookmarksFromTrashOptions {
    bookmarkIds: number[];
}

export const removeBookmarksFromTrash = <CacheType>(
    cache: ApolloCache<CacheType>,
    { bookmarkIds }: RemoveBookmarksFromTrashOptions,
) => {
    const trash = cache.readQuery({ query: DELETED_BOOMARKS }) as { bookmarks: BookmarksResult } | null;
    if (trash?.bookmarks.__typename === 'Bookmarks') {
        cache.writeQuery({
            query: DELETED_BOOMARKS,
            data: {
                bookmarks: {
                    ...trash.bookmarks,
                    bookmarks: trash.bookmarks.bookmarks.filter((b) => !bookmarkIds.includes(b?.id || 0)),
                },
            },
        });
    }
};
