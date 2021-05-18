import React, { useEffect, useState } from 'react';
import { KremeProvider, Tree } from 'kreme';
import { useCreateFolderMutation, useMoveFolderMutation, useGetTreeQuery } from '@graphql/generated/graphql';
import { useRouter } from 'next/dist/client/router';
import { isBaseError } from '@graphql/helpers';
import { useForm } from '@lib/useForm';
import dynamic from 'next/dynamic';
import { TreeDataType } from 'kreme/build/Tree/types';

const FolderActionsPopup = dynamic(() => import('./FolderActionsPopup/FolderActionsPopup'));

const Sidebar = () => {
    const { data, loading } = useGetTreeQuery();
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

    const [createFolder] = useCreateFolderMutation({});
    const [moveFolder] = useMoveFolderMutation();
    const { inputs, handleChange } = useForm({ name: '' });
    if (!data || isBaseError(data?.getTree)) return <p>he</p>;

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
                    }}
                    draggable
                />
            </KremeProvider>
            <div>
                <form
                    action=""
                    onSubmit={async (e) => {
                        e.preventDefault();
                        await createFolder({
                            variables: { name: inputs.name },
                            refetchQueries: ['getTree'],
                            awaitRefetchQueries: true,
                        });
                    }}
                >
                    <input type="text" name="name" onChange={handleChange} className="px-1 bg-transparent border-b" />
                    <button type="submit"></button>
                </form>
            </div>
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
