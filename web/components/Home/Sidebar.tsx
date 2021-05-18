import React, { useMemo, useState } from 'react';
import { KremeProvider, Tree } from 'kreme';
import { Folder, useCreateFolderMutation, useMoveFolderMutation, useTree_QueryQuery } from '@graphql/generated/graphql';
import { useRouter } from 'next/dist/client/router';
import { isBaseError } from '@graphql/helpers';
import { useForm } from '@lib/useForm';
import dynamic from 'next/dynamic';

const FolderActionsPopup = dynamic(() => import('./FolderActionsPopup/FolderActionsPopup'));

interface FolderWithFolderType extends Folder {
    type: 'folder';
    children: [] | FolderWithFolderType[];
}

const Sidebar = () => {
    const { data, refetch } = useTree_QueryQuery();
    const router = useRouter();
    const [actionClickLocation, setActionClickLocation] = useState({ x: 0, y: 0 });
    const [actionFolderId, setActionFolderId] = useState(0);
    const [willShowActions, setWillShowActions] = useState(false);
    const struct = useMemo<FolderWithFolderType[]>(() => {
        if (!data || isBaseError(data.getTree)) {
            return [];
        }
        return JSON.parse(data.getTree.tree || '[]');
    }, [data]);
    const [createFolder] = useCreateFolderMutation();
    const [moveFolder] = useMoveFolderMutation();
    const { inputs, handleChange } = useForm({ name: '' });
    if (!data || isBaseError(data.getTree)) return null;

    return (
        <div className="fixed w-[235px] z-[1]  h-screen bg-sidebar">
            <KremeProvider>
                <Tree
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
                        console.log(data);
                    }}
                    draggable
                />
            </KremeProvider>
            <div>
                <form
                    action=""
                    onSubmit={async (e) => {
                        e.preventDefault();
                        console.log('hey');
                        const x = await createFolder({ variables: { name: inputs.name } });
                        console.log(x);
                    }}
                >
                    <input type="text" name="name" onChange={handleChange} className="px-1 bg-transparent border-b" />
                    <button type="submit"></button>
                </form>
            </div>
            {willShowActions && (
                <FolderActionsPopup
                    onDelete={refetch}
                    closePopup={() => setWillShowActions(false)}
                    folderId={Number(actionFolderId)}
                    style={{ top: actionClickLocation.y + 2, left: actionClickLocation.x + 2 }}
                />
            )}
        </div>
    );
};
export default Sidebar;
