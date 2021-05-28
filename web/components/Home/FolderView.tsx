import dynamic from 'next/dynamic';
import Button from '@components/Button/Button';
import { useFolderQuery } from '@graphql/generated/graphql';
import { isBaseError } from '@graphql/helpers';
import React, { useState } from 'react';
import BookmarkCard from './BookmarkCard';
import { cloneDeep } from 'lodash';
import { bookmarkDateSort } from '@lib/sortFuncs';
import EditingBookmarkCard from './EditingBookmarkCard';
import { useEditing } from '@lib/useEditing';

const AddBookmarkDropdown = dynamic(() => import('./AddBookmarkDropdown'));
interface Props {
    folderId: number;
}

const FolderView = ({ folderId }: Props) => {
    const { data } = useFolderQuery({
        variables: {
            id: Number(folderId),
        },
    });

    const [isOpen, setIsOpen] = useState(false);
    const { currentEditingBookmark, stopEditing, triggerEditing } = useEditing();

    if (!data || isBaseError(data.folder)) return null;
    const { name, bookmarks } = data.folder;
    const sorted = cloneDeep(bookmarks).sort((prev, curr) => {
        if (!prev || !curr) {
            return 0;
        }
        return bookmarkDateSort(prev, curr);
    });

    return (
        <div>
            <div className="relative flex items-center justify-between p-3 pb-10">
                <h2 className="text-4xl font-bold text-header line-clamp-1">{name}</h2>
                <div className="relative">
                    <Button
                        className="relative whitespace-nowrap"
                        onClick={() => {
                            setIsOpen(true);
                        }}
                        onMouseDown={(e) => {
                            e.stopPropagation();
                        }}
                    >
                        <span>Add +</span>
                    </Button>
                    <AddBookmarkDropdown folderId={folderId} isOpen={isOpen} closeDropDown={() => setIsOpen(false)} />
                </div>
            </div>
            <div>
                {sorted.map((bookmark) => {
                    if (currentEditingBookmark === bookmark?.id)
                        return <EditingBookmarkCard key={bookmark.id} bookmark={bookmark} stopEditing={stopEditing} />;
                    return (
                        bookmark && (
                            <BookmarkCard
                                triggerEditing={triggerEditing}
                                folderId={folderId}
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

export default FolderView;
