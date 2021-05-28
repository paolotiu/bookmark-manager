import { gql, useApolloClient, useReactiveVar } from '@apollo/client';
import Button from '@components/Button/Button';
import { Bookmark, Folder, useUpdateBookmarkMutation } from '@graphql/generated/graphql';
import { treeVar } from '@lib/apolloClient';
import { useForm } from '@lib/useForm';
import { KremeProvider, Tree } from 'kreme';
import { addBookmarksToFolder, removeBookmarkFromFolder } from './cacheUpdates';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';

interface Props {
    bookmark: Bookmark;
    stopEditing: () => void;
}

const EditingBookmarkCard = ({ bookmark, stopEditing }: Props) => {
    const { inputs, handleChange } = useForm({
        title: bookmark.title,
        description: bookmark.description || '',
        url: bookmark.url,
    });

    const client = useApolloClient();
    const [currentFolder, setCurrentFolder] = useState<Pick<Folder, 'name' | 'id'> | null>(null);
    const [willShowFoldersDropdown, setWillShowFoldersDropdown] = useState(false);
    const [isDropdownOnTop, setIsDropdownOnTop] = useState(false);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const autoResize = () => {
        if (textAreaRef.current) {
            const { current: textArea } = textAreaRef;
            textArea.style.height = textArea.scrollHeight + 'px';
        }
    };

    const [updateBookmark] = useUpdateBookmarkMutation({
        update(cache, { data }) {
            if (data?.updateBookmark.__typename === 'Bookmark' && data.updateBookmark.folderId) {
                addBookmarksToFolder(cache, {
                    bookmarks: [data.updateBookmark],
                    folderId: data.updateBookmark.folderId || 0,
                });

                // Prevent cache filtering if folders dont change
                if (bookmark.folderId === data.updateBookmark.folderId || !bookmark.folderId) return;

                // Evict from this folder
                removeBookmarkFromFolder(cache, {
                    bookmarkIds: [bookmark.id],
                    folderId: bookmark.folderId,
                });
            }
        },
        optimisticResponse: {
            updateBookmark: {
                createdDate: bookmark.createdDate,
                id: bookmark.id,
                title: inputs.title,
                url: inputs.url,
                __typename: 'Bookmark',
                description: inputs.description,
                folderId: currentFolder?.id,
            },
        },
    });
    const tree = useReactiveVar(treeVar);
    const treeRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Resize on first render
        autoResize();
        if (bookmark.folderId) {
            const folder = client.cache.readFragment({
                id: 'Folder:' + bookmark.folderId,
                fragment: gql`
                    fragment EditingFolder on Folder {
                        id
                        name
                    }
                `,
            }) as Folder;
            setCurrentFolder({ id: folder.id, name: folder.name });
        }
    }, [bookmark.folderId, client.cache]);

    useEffect(() => {
        const closeDropdown = () => {
            setWillShowFoldersDropdown(false);
        };
        window.addEventListener('mousedown', closeDropdown);

        return () => {
            window.removeEventListener('mousedown', closeDropdown);
        };
    }, []);

    useLayoutEffect(() => {
        if (willShowFoldersDropdown && treeRef.current) {
            const bounding = treeRef.current.getBoundingClientRect();
            const top = bounding.top;
            const height = bounding.height;
            let buffer = 100;

            const isOnTop = (buffer: number) => top + height + buffer > window.innerHeight;
            setIsDropdownOnTop((prev) => {
                if (!prev) {
                    return isOnTop(buffer);
                }
                buffer = 100 + height;
                return isOnTop(buffer);
            });
        }
    }, [willShowFoldersDropdown]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await updateBookmark({
            variables: {
                data: {
                    id: bookmark.id,
                    description: inputs.description,
                    title: inputs.title,
                    url: inputs.url,
                    folderId: currentFolder?.id,
                },
            },
        });
        stopEditing();
    };

    return (
        <form onSubmit={handleSubmit} className="p-3">
            <div className="p-3 mt-4 border rounded-md focus-within:border-gray-300">
                <div className="grid gap-2">
                    <div className="space-y-3">
                        <input
                            type="text"
                            name="title"
                            value={inputs.title}
                            onChange={handleChange}
                            autoFocus
                            className="w-full font-medium outline-none focus-within:shadow-border-b-gray-300"
                        />
                        <textarea
                            ref={textAreaRef}
                            onKeyDown={autoResize}
                            name="description"
                            placeholder="Enter a description..."
                            className="w-full overflow-hidden text-sm break-words outline-none resize-none focus-within:shadow-border-b-gray-300"
                            value={inputs.description}
                            style={{ height: '20px' }}
                            onChange={handleChange}
                        />
                        <div className="flex flex-col space-y-2 lg:space-y-0 lg:space-x-3 lg:flex-row">
                            <div className="flex flex-1 p-2 space-x-1 text-sm border rounded-sm bg-inputGrayBg focus-within:border-gray-300">
                                <label htmlFor="url" className="text-inputGrayText">
                                    URL:
                                </label>
                                <input
                                    type="text"
                                    name="url"
                                    value={inputs.url}
                                    onChange={handleChange}
                                    className="flex-1 bg-transparent outline-none w-max"
                                />
                            </div>
                            <div className="relative flex-1 text-sm ">
                                <div
                                    role="button"
                                    className={`relative flex-1 p-2 border rounded-sm bg-inputGrayBg ${
                                        willShowFoldersDropdown && 'border-gray-300'
                                    }`}
                                    tabIndex={1}
                                    onClick={() => {
                                        setWillShowFoldersDropdown(true);
                                    }}
                                >
                                    <span>{currentFolder?.name}</span>
                                </div>
                                <KremeProvider>
                                    <div
                                        onMouseDownCapture={(e) => {
                                            e.stopPropagation();
                                        }}
                                    >
                                        {willShowFoldersDropdown && (
                                            <div
                                                className={`absolute overflow-auto left-0 z-10  w-full p-2 bg-white border rounded-sm max-h-52 ${
                                                    isDropdownOnTop
                                                        ? 'bottom-[120%] shadow-md'
                                                        : 'top-[110%] shadow-lg '
                                                }`}
                                                ref={treeRef}
                                            >
                                                <Tree
                                                    data={tree}
                                                    withActionButton={false}
                                                    onFolderClick={(id) => {
                                                        const x = client.readFragment({
                                                            id: 'Folder:' + id,
                                                            fragment: gql`
                                                                fragment ReadFolder on Folder {
                                                                    id
                                                                    name
                                                                }
                                                            `,
                                                        });
                                                        setCurrentFolder(x);
                                                        setWillShowFoldersDropdown(false);
                                                    }}
                                                    noDropOnEmpty
                                                />
                                            </div>
                                        )}
                                    </div>
                                </KremeProvider>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex pt-3 space-x-1">
                <Button type="submit">Save</Button>
                <Button type="button" isSecondary className="font-normal border-none text-header" onClick={stopEditing}>
                    Cancel
                </Button>
            </div>
        </form>
    );
};

export default EditingBookmarkCard;
