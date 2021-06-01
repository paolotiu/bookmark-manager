import { gql, useApolloClient, useReactiveVar } from '@apollo/client';
import {
    Bookmark,
    Folder,
    useChangeFolderOrderMutation,
    useGetTreeQuery,
    useMoveBookmarkMutation,
    useMoveFolderMutation,
    useUpdateFolderMutation,
} from '@graphql/generated/graphql';
import { treeVar } from '@lib/apolloClient';
import { useDebouncedCallback } from '@lib/useDebouncedCallback';
import { KremeProvider, Tree as KremeTree } from 'kreme';
import { TreeDataType } from 'kreme/build/Tree/types';
import { useRouter } from 'next/dist/client/router';
import React, { useRef } from 'react';
import { addBookmarksToFolder, removeBookmarkFromFolder } from '../cacheUpdates';
import { SidebarItem } from '../Sidebar';

interface Props {
    setActionFolderId: React.Dispatch<React.SetStateAction<number>>;
    handleItemClick: (e: React.MouseEvent<any>, item: SidebarItem) => void;
}

const Tree = ({ setActionFolderId, handleItemClick }: Props) => {
    const folderIdRef = useRef(-1);
    const prevFolderIdRef = useRef(-1);
    const bookmarkRef = useRef<Bookmark>();
    const [changeFolderOrder] = useChangeFolderOrderMutation();
    const router = useRouter();
    const [moveFolder] = useMoveFolderMutation();
    const [moveBookmark] = useMoveBookmarkMutation({
        update(cache, { data }) {
            if (data?.updateBookmark.__typename === 'Bookmark') {
                const { id } = data.updateBookmark;
                removeBookmarkFromFolder(cache, { bookmarkIds: [id], folderId: prevFolderIdRef.current });
                addBookmarksToFolder(cache, { bookmarks: [data.updateBookmark], folderId: folderIdRef.current });
            }
        },
        optimisticResponse: {
            updateBookmark: {
                ...(bookmarkRef.current as Bookmark),
                folderId: folderIdRef.current,
            },
        },
    });
    const localTree = useReactiveVar(treeVar);
    const client = useApolloClient();
    const [updateFolder] = useUpdateFolderMutation();
    useGetTreeQuery({
        onCompleted(data) {
            if (data.getTree.__typename === 'Tree') {
                const tree = data.getTree.tree as unknown as Folder[] | undefined;
                const writeToCache = (folder: Folder) => {
                    client.writeFragment({
                        id: 'Folder:' + folder.id,
                        fragment: gql`
                            fragment MyFolder on Folder {
                                name
                                id
                            }
                        `,
                        data: {
                            __typename: 'Folder',
                            name: folder.name,
                            id: folder.id,
                        },
                    });

                    if (folder.children.length) {
                        folder.children.forEach((folder) => {
                            if (folder) {
                                writeToCache(folder);
                            }
                        });
                    }
                };
                tree?.forEach(writeToCache);
            }
        },
    });
    const debouncedUpdateFolder = useDebouncedCallback(updateFolder, 5000);

    return (
        <KremeProvider>
            <KremeTree
                onInputSubmit={({ id, newName, oldName }) => {
                    if (newName === oldName) return;

                    // Update server state
                    updateFolder({ variables: { data: { name: newName, id: Number(id) } } });

                    // Update tree state
                    const updateData = (item: TreeDataType) => {
                        if (item.id === id) {
                            item.isInput = false;
                            item.name = newName;
                            return item;
                        }
                        item.children = item.children?.map(updateData);
                        return item;
                    };

                    treeVar(treeVar().map(updateData));
                }}
                onItemToggle={(id, isOpen) => {
                    debouncedUpdateFolder({ variables: { data: { id: Number(id), isOpen } } });
                }}
                noDropOnEmpty
                acceptedDropTypes={['Bookmark']}
                onDrop={{
                    Bookmark: async (item: Bookmark, folder) => {
                        prevFolderIdRef.current = item.folderId || 0;
                        folderIdRef.current = Number(folder.id);
                        bookmarkRef.current = item;
                        if (item.folderId === folder.id) {
                            return;
                        }
                        await moveBookmark({ variables: { id: item.id, folderId: Number(folder.id) } });
                    },
                }}
                className="text-sm text-inactiveSidebar"
                hoverColor="#5138ED40"
                hoverBarColor="#5138ED80"
                spaceLeft="1rem"
                data={localTree}
                onFolderClick={(id) => {
                    router.push('/home/' + id, undefined, {});
                }}
                onFolderActionClick={async (e, id) => {
                    e.stopPropagation();
                    setActionFolderId(Number(id));
                    handleItemClick(e, 'folder');
                }}
                onFolderDrop={(data) => {
                    const orderVars = {
                        sourceFolderOrder: data.sourceParent.children?.map((c) => Number(c.id)) || [],
                        targetFolderOrder: data.targetParent.children?.map((c) => Number(c.id)) || [],
                        targetParentId: Number(data.targetParent.id),
                        sourceParentId: Number(data.sourceParent.id),
                    };
                    if (data.sourceParent.id === data.targetParent.id) {
                        changeFolderOrder({ variables: orderVars });
                    } else {
                        moveFolder({
                            variables: {
                                folderId: Number(data.sourceId),
                                targetId: Number(data.targetId),
                                ...orderVars,
                            },
                        });
                    }

                    treeVar(data.newTree);
                }}
                draggable
            />
        </KremeProvider>
    );
};

export default Tree;
