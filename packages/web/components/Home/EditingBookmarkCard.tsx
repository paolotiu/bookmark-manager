import { useApolloClient, useReactiveVar } from '@apollo/client';
import Button from '@components/Button/Button';
import { Bookmark, useUpdateBookmarkMutation } from '@graphql/generated/graphql';
import { treeVar } from '@lib/apolloClient';
import { useForm } from '@lib/useForm';
import { KremeProvider, Tree } from 'kreme';
import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { addBookmarksToFolder, removeBookmarkFromFolder, useFolderCache } from './cacheUpdates';

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
    const [willShowFoldersDropdown, setWillShowFoldersDropdown] = useState(false);
    const [isDropdownOnTop, setIsDropdownOnTop] = useState(false);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const autoResize = useCallback(() => {
        if (textAreaRef.current) {
            const { current: textArea } = textAreaRef;
            textArea.style.height = textArea.scrollHeight + 'px';
        }
    }, []);

    const { folder, updateFolder } = useFolderCache(bookmark.folderId || 0);
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
                folderId: folder?.id,
            },
        },
    });
    const tree = useReactiveVar(treeVar);
    const treeRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Resize on first render
        autoResize();
    }, [autoResize, bookmark.folderId, client.cache]);

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
            const { top } = bounding;
            const { height } = bounding;
            let buffer = 100;

            const isOnTop = (b: number) => top + height + b > window.innerHeight;
            setIsDropdownOnTop((prev) => {
                if (!prev) {
                    return isOnTop(buffer);
                }
                // Times 1.1 to account for position 110%
                buffer += height * 1.1;
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
                    folderId: folder?.id,
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
                                    <input
                                        type="text"
                                        name="url"
                                        value={inputs.url}
                                        onChange={handleChange}
                                        className="flex-1 bg-transparent outline-none w-max"
                                    />
                                </label>
                            </div>
                            <div className="relative flex-1 text-sm ">
                                <div
                                    role="button"
                                    className={`relative flex-1 p-2 border rounded-sm bg-inputGrayBg ${
                                        willShowFoldersDropdown && 'border-gray-300'
                                    }`}
                                    onKeyPress={(e) => {
                                        if (e.key === 'enter') {
                                            setWillShowFoldersDropdown(true);
                                        }
                                    }}
                                    tabIndex={0}
                                    onClick={() => {
                                        setWillShowFoldersDropdown(true);
                                    }}
                                >
                                    <span>{folder?.name || '<No-Folder>'}</span>
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
                                                        updateFolder(Number(id));
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
