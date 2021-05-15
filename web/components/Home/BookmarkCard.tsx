import { ApolloCache } from '@apollo/client';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Bookmark, useHardDeleteBookmarkMutation, useSoftDeleteBookmarkMutation } from '@graphql/generated/graphql';
import { decode } from 'html-entities';

interface Props {
    bookmark: Bookmark;
    hardDelete?: boolean;
    // For cache updates
    folderId: number;
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
};
const BookmarkCard = ({ bookmark, hardDelete = false, folderId }: Props) => {
    const [softDeleteBookmark] = useSoftDeleteBookmarkMutation({
        update(cache) {
            bookmarkSoftDeletionCacheUpdate(cache, bookmark.id, folderId);
        },
    });
    const [hardDeleteBookmark] = useHardDeleteBookmarkMutation({
        update(cache) {
            cache.evict({ id: cache.identify({ __typename: 'Bookmark', id: bookmark.id }) });
        },
    });

    const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (hardDelete) {
            hardDeleteBookmark({ variables: { id: bookmark.id } });
        }
        softDeleteBookmark({ variables: { id: bookmark.id } });
    };
    return (
        <a
            href={bookmark.url}
            rel="noreferrer"
            target="_blank"
            className="relative block border-b border-gray-200 hover:bg-gray-50 group"
        >
            <div className="grid gap-2 p-3">
                <div className="flex justify-between pr-4">
                    <h3 className="pr-5 text-base font-medium line-clamp-3">{decode(bookmark.title)}</h3>

                    <div className="hidden top-2 right-8 group-hover:block">
                        <button onClick={handleDelete}>
                            <FontAwesomeIcon
                                icon={faTrash}
                                className="text-iconPassive hover:text-iconActive no-outline"
                            />
                        </button>
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
