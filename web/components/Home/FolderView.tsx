import dynamic from 'next/dynamic';
import Button from '@components/Button/Button';
import { useFolderQuery } from '@graphql/generated/graphql';
import { isBaseError } from '@graphql/helpers';
import React, { useState } from 'react';
import BookmarkCard from './BookmarkCard';
import { cloneDeep } from 'lodash';
import { bookmarkDateSort } from '@lib/sortFuncs';

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
                <h2 className="text-4xl font-bold text-header">{name}</h2>
                <div className="relative">
                    <Button
                        className="relative"
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
                    return bookmark && <BookmarkCard folderId={folderId} bookmark={bookmark} key={bookmark?.id} />;
                })}
            </div>
        </div>
    );
};

export default FolderView;
