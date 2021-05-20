import dynamic from 'next/dynamic';
import Button from '@components/Button/Button';
import { useFolderQuery } from '@graphql/generated/graphql';
import { isBaseError } from '@graphql/helpers';
import React, { useEffect, useState } from 'react';
import BookmarkCard from './BookmarkCard';

const AddBookmarkDropdown = dynamic(() => import('./AddBookmarkDropdown'));

interface Props {
    folderId: number;
}

const FolderView = ({ folderId }: Props) => {
    const { data, refetch } = useFolderQuery({
        variables: {
            id: Number(folderId),
        },
    });

    const [isOpen, setIsOpen] = useState(false);
    useEffect(() => {
        const closeAddForm = () => {
            setIsOpen(false);
        };
        // Close dropdown on outside click
        window.addEventListener('mousedown', closeAddForm);
        return () => {
            window.removeEventListener('mousedown', closeAddForm);
        };
    }, []);

    if (!data || isBaseError(data.folder)) return null;
    const { name, bookmarks } = data.folder;
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
                    <AddBookmarkDropdown folderId={folderId} isOpen={isOpen} onSubmit={refetch} />
                </div>
            </div>
            <div>
                {bookmarks.map((bookmark) => {
                    return bookmark && <BookmarkCard folderId={folderId} bookmark={bookmark} key={bookmark?.id} />;
                })}
            </div>
        </div>
    );
};

export default FolderView;
