import React, { useEffect, useState } from 'react';
import { useGetTreeQuery, useUserNameQuery } from '@graphql/generated/graphql';
import { isBaseError } from '@graphql/helpers';
import { TreeDataType } from 'kreme/build/Tree/types';
import { BiUser } from 'react-icons/bi';
import { AiOutlinePlus } from 'react-icons/ai';
import { FiBookmark, FiSettings, FiTrash } from 'react-icons/fi';
import dynamic from 'next/dynamic';
import AddFolderForm from './AddFolderForm/AddFolderForm';
import Tree from './Tree/Tree';
import { useRouter } from 'next/dist/client/router';

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
            <div className="flex items-center justify-center text-inactiveSidebar"> {icon}</div>
            <div className="ml-[10px] font-normal pt-[3px] text-inactiveSidebar">{label}</div>
        </div>
    );
};
const FolderActionsPopup = dynamic(() => import('./FolderActionsPopup/FolderActionsPopup'));

const Sidebar = () => {
    const router = useRouter();
    const { data, loading } = useGetTreeQuery();
    const [willShowNewFolderInput, setWillShowNewFolderInput] = useState(false);
    const [willShowActions, setWillShowActions] = useState(false);
    const [actionClickLocation, setActionClickLocation] = useState({ x: 0, y: 0 });
    const [actionFolderId, setActionFolderId] = useState(0);
    const { data: userNameData } = useUserNameQuery();
    const [struct, setStruct] = useState<TreeDataType[]>([]);
    useEffect(() => {
        if (!loading && data?.getTree.__typename === 'Tree') {
            setStruct(JSON.parse(data.getTree.tree || '[]'));
        }
    }, [data, loading]);

    if (!data || isBaseError(data?.getTree)) return <p>he</p>;

    return (
        <div className="fixed w-[235px] z-[1] py-4  h-screen bg-sidebar">
            <SidebarItem
                icon={<BiUser size="20px" />}
                label={userNameData?.me?.__typename === 'User' ? userNameData.me.name : ''}
            />
            <div className="pt-4">
                <SidebarItem
                    label="All Bookmarks"
                    icon={<FiBookmark size="1.25em" />}
                    onClick={() => {
                        router.push('/home/all');
                    }}
                />

                <SidebarItem
                    label="Settings"
                    icon={<FiSettings size="1.25em" />}
                    onClick={() => {
                        router.push('/home/all');
                    }}
                />
                <SidebarItem
                    label="Trash"
                    icon={<FiTrash size="1.25em" />}
                    onClick={() => {
                        router.push('/home/deleted');
                    }}
                />
            </div>
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
