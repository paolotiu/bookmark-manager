import React, { useEffect, useRef, useState } from 'react';
import { KremeProvider, Tree } from 'kreme';
import { useMoveFolderMutation, useGetTreeQuery, useMoveBookmarkMutation } from '@graphql/generated/graphql';
import { useRouter } from 'next/dist/client/router';
import { isBaseError } from '@graphql/helpers';
import { TreeDataType } from 'kreme/build/Tree/types';

import dynamic from 'next/dynamic';
import AddFolderForm from './AddFolderForm/AddFolderForm';
import { FOLDER } from '@graphql/folder/folderQuery';
import { Bookmark } from '@entity/Bookmark';

const FolderActionsPopup = dynamic(() => import('./FolderActionsPopup/FolderActionsPopup'));

const Sidebar = () => {
    const { data, loading } = useGetTreeQuery();
    const folderIdRef = useRef(-1);
    const prevFolderIdRef = useRef(-1);
    const [moveBookmark] = useMoveBookmarkMutation({
        update(cache, { data }) {
            if (data?.updateBookmark.__typename === 'Bookmark') {
                const { id } = data.updateBookmark;
                cache.modify({
                    id: cache.identify({ __typename: 'Folder', id: prevFolderIdRef.current }),
                    fields: {
                        bookmarks(existingBookmarksRef = [], { readField }) {
                            return existingBookmarksRef.filter(
                                (bookmarkRef: any) => id !== readField('id', bookmarkRef),
                            );
                        },
                    },
                });
            }
        },
        refetchQueries: [{ query: FOLDER, variables: { id: folderIdRef.current } }],
    });
    const [struct, setStruct] = useState<TreeDataType[]>([]);
    const router = useRouter();
    const [actionClickLocation, setActionClickLocation] = useState({ x: 0, y: 0 });
    const [actionFolderId, setActionFolderId] = useState(0);
    const [willShowActions, setWillShowActions] = useState(false);
    useEffect(() => {
        if (!loading && data?.getTree.__typename === 'Tree') {
            setStruct(JSON.parse(data.getTree.tree || '[]'));
        }
    }, [data, loading]);

    const [moveFolder] = useMoveFolderMutation();
    if (!data || isBaseError(data?.getTree)) return <p>he</p>;

    return (
        <div className="fixed w-[235px] z-[1]  h-screen bg-sidebar">
            <KremeProvider>
                <Tree
                    noDropOnEmpty
                    acceptedDropTypes={['Bookmark']}
                    onDrop={{
                        Bookmark: async (item: Bookmark, folder) => {
                            prevFolderIdRef.current = item.folderId || 0;
                            folderIdRef.current = Number(folder.id);

                            console.log(item.folderId, folder.id);
                            if (item.folderId === folder.id) {
                                return;
                            }
                            await moveBookmark({ variables: { id: item.id, folderId: Number(folder.id) } });
                        },
                    }}
                    className="text-sm"
                    hoverColor="#5138ED40"
                    hoverBarColor="#5138ED80"
                    spaceLeft="1rem"
                    data={struct}
                    onFolderClick={(id) => {
                        router.push('/home/' + id, undefined, {});
                    }}
                    onFolderActionClick={async (e, id) => {
                        e.stopPropagation();
                        setActionClickLocation({ x: e.clientX, y: e.clientY });
                        setActionFolderId(Number(id));
                        setWillShowActions(true);
                    }}
                    onFolderDrop={(data) => {
                        moveFolder({
                            variables: {
                                folderId: Number(data.sourceId),
                                targetId: Number(data.targetId),
                            },
                        });
                    }}
                    draggable
                />
            </KremeProvider>
            <AddFolderForm />
            {willShowActions && (
                <FolderActionsPopup
                    closePopup={() => setWillShowActions(false)}
                    folderId={Number(actionFolderId)}
                    style={{ top: actionClickLocation.y + 2, left: actionClickLocation.x + 2 }}
                />
            )}
        </div>
    );
};
export default Sidebar;
