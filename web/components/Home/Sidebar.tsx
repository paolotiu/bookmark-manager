import React, { useEffect, useState } from 'react';
import { useGetTreeQuery } from '@graphql/generated/graphql';
import { isBaseError } from '@graphql/helpers';
import { TreeDataType } from 'kreme/build/Tree/types';

import dynamic from 'next/dynamic';
import AddFolderForm from './AddFolderForm/AddFolderForm';
import Tree from './Tree/Tree';

const FolderActionsPopup = dynamic(() => import('./FolderActionsPopup/FolderActionsPopup'));

const Sidebar = () => {
    const { data, loading } = useGetTreeQuery();

    const [willShowActions, setWillShowActions] = useState(false);
    const [actionClickLocation, setActionClickLocation] = useState({ x: 0, y: 0 });
    const [actionFolderId, setActionFolderId] = useState(0);
    const [struct, setStruct] = useState<TreeDataType[]>([]);
    useEffect(() => {
        if (!loading && data?.getTree.__typename === 'Tree') {
            setStruct(JSON.parse(data.getTree.tree || '[]'));
        }
    }, [data, loading]);

    if (!data || isBaseError(data?.getTree)) return <p>he</p>;

    return (
        <div className="fixed w-[235px] z-[1]  h-screen bg-sidebar">
            <Tree
                struct={struct}
                setActionClickLocation={setActionClickLocation}
                setActionFolderId={setActionFolderId}
                setWillShowActions={setWillShowActions}
            />
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
