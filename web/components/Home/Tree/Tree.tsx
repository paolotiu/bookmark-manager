import { Bookmark } from '@entity/Bookmark';
import { FOLDER } from '@graphql/folder/folderQuery';
import {
    useChangeFolderOrderMutation,
    useMoveBookmarkMutation,
    useMoveFolderMutation,
} from '@graphql/generated/graphql';
import { KremeProvider, Tree as KremeTree } from 'kreme';
import { TreeDataType } from 'kreme/build/Tree/types';
import { useRouter } from 'next/dist/client/router';
import React, { useRef } from 'react';

interface Props {
    struct: TreeDataType[];
    setActionClickLocation: React.Dispatch<
        React.SetStateAction<{
            x: number;
            y: number;
        }>
    >;
    setActionFolderId: React.Dispatch<React.SetStateAction<number>>;
    setWillShowActions: React.Dispatch<React.SetStateAction<boolean>>;
}

const Tree = ({ struct, setActionClickLocation, setActionFolderId, setWillShowActions }: Props) => {
    const folderIdRef = useRef(-1);
    const prevFolderIdRef = useRef(-1);
    const [changeFolderOrder] = useChangeFolderOrderMutation();
    const router = useRouter();
    const [moveFolder] = useMoveFolderMutation();
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
    return (
        <KremeProvider>
            <KremeTree
                noDropOnEmpty
                acceptedDropTypes={['Bookmark']}
                onDrop={{
                    Bookmark: async (item: Bookmark, folder) => {
                        prevFolderIdRef.current = item.folderId || 0;
                        folderIdRef.current = Number(folder.id);

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
                }}
                draggable
            />
        </KremeProvider>
    );
};

export default Tree;
