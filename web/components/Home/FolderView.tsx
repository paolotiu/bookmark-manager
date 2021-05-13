import Button from '@components/Button/Button';
import { Bookmark, useCreateBookmarkMutation, useFolderQuery } from '@graphql/generated/graphql';
import { isBaseError, isValidationError } from '@graphql/helpers';
import { Transition } from '@headlessui/react';
import { useForm } from '@lib/useForm';
import Link from 'next/link';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import AddBookmarkDropdown from './AddBookmarkDropdown';

interface Props {
    folderId: number | string;
}

interface BookmardCardProps {
    bookmark: Bookmark;
}
const BookmarkCard = ({ bookmark }: BookmardCardProps) => {
    return (
        <a
            href={bookmark.url}
            rel="noreferrer"
            target="_blank"
            className="block border-b border-gray-200 hover:bg-gray-50"
        >
            <div className="grid gap-2 p-3">
                <h3 className="text-base font-medium">{bookmark.title}</h3>
                <p className="text-sm leading-5">{bookmark.description}</p>
                <span className="text-xs text-gray-400">{bookmark.url}</span>
            </div>
        </a>
    );
};

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
        <div className="">
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
                    return bookmark && <BookmarkCard bookmark={bookmark} key={bookmark?.id} />;
                })}
            </div>
        </div>
    );
};

export default FolderView;
