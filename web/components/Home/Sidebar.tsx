import React, { useEffect, useState } from 'react';
import { useGetTreeQuery } from '@graphql/generated/graphql';
import { isBaseError } from '@graphql/helpers';
import { TreeDataType } from 'kreme/build/Tree/types';

import { AiOutlinePlus } from 'react-icons/ai';
import dynamic from 'next/dynamic';
import AddFolderForm from './AddFolderForm/AddFolderForm';
import Tree from './Tree/Tree';

interface SidebarItemProps {
    icon?: any;
    label: string;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
}
const SidebarItem = ({ icon, label, onClick }: SidebarItemProps) => {
    return (
        <div
            className="grid items-center justify-center px-2 py-1 pl-4 text-sm hover:bg-hoverColor"
            role="button"
            tabIndex={-1}
            style={{ gridTemplateColumns: '20px 1fr' }}
            onClick={onClick}
        >
            <div className="flex items-center justify-center"> {icon}</div>
            <div className="ml-[5px]">{label}</div>
        </div>
    );
};
const FolderActionsPopup = dynamic(() => import('./FolderActionsPopup/FolderActionsPopup'));

const Sidebar = () => {
    const { data, loading } = useGetTreeQuery();
    const [willShowNewFolderInput, setWillShowNewFolderInput] = useState(false);
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
            <div className="pt-40">
                <Tree
                    struct={struct}
                    setActionClickLocation={setActionClickLocation}
                    setActionFolderId={setActionFolderId}
                    setWillShowActions={setWillShowActions}
                />
            </div>
            {willShowNewFolderInput && <AddFolderForm closeForm={() => setWillShowNewFolderInput(false)} />}
            {!willShowNewFolderInput && (
                <SidebarItem
                    icon={<AiOutlinePlus />}
                    label="Add Folder"
                    onClick={() => {
                        setWillShowNewFolderInput(true);
                    }}
                />
            )}

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
