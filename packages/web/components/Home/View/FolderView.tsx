import { useFolderQuery } from '@graphql/generated/graphql';
import { isBaseError } from '@graphql/helpers';
import React from 'react';
import { cloneDeep } from 'lodash';
import { bookmarkDateSort } from '@lib/sortFuncs';
import { useEditing } from '@lib/useEditing';
import EditingBookmarkCard from '../EditingBookmarkCard';
import BookmarkCard from '../BookmarkCard';
import NotFoundView from './NotFoundView';
import View from './View';
import { useDropdown } from './useDropdown';
import { useSelectedBookmarks } from './useSelectedBookmarks';

interface Props {
    folderId: number;
}

const FolderView = ({ folderId }: Props) => {
    const { data, loading } = useFolderQuery({
        variables: {
            id: Number(folderId),
        },
    });

    const { currentEditingBookmark, stopEditing, triggerEditing } = useEditing();
    const { closeDropdown, isDropdownOpen, openDropdown } = useDropdown();
    const { addToSelected, removedFromSelected } = useSelectedBookmarks();

    if (loading) return null;
    if (!data || isBaseError(data.folder)) return <NotFoundView />;

    const { name, bookmarks } = data.folder;
    const sorted = cloneDeep(bookmarks).sort((prev, curr) => {
        if (!prev || !curr) {
            return 0;
        }
        return bookmarkDateSort(prev, curr);
    });

    return (
        <View
            folderId={folderId}
            buttonLabel="Add +"
            buttonOnClick={openDropdown}
            title={name}
            withAddBookmarkDropdown
            closeDropdown={closeDropdown}
            isAddDropdownOpen={isDropdownOpen}
        >
            {sorted.map((bookmark) => {
                if (currentEditingBookmark === bookmark?.id)
                    return <EditingBookmarkCard key={bookmark.id} bookmark={bookmark} stopEditing={stopEditing} />;
                return (
                    bookmark && (
                        <BookmarkCard
                            addToSelected={addToSelected}
                            removeFromSelected={removedFromSelected}
                            triggerEditing={triggerEditing}
                            folderId={folderId}
                            bookmark={bookmark}
                            key={bookmark?.id}
                        />
                    )
                );
            })}
        </View>
    );
};

export default FolderView;
