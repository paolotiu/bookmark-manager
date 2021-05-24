import React, { useEffect, useState } from 'react';
import { useGetTreeQuery, useUserNameQuery } from '@graphql/generated/graphql';
import { isBaseError } from '@graphql/helpers';
import { TreeDataType } from 'kreme/build/Tree/types';
import { BiUser } from 'react-icons/bi';
import { AiOutlinePlus } from 'react-icons/ai';
import { FiBookmark, FiSettings, FiTrash, FiMenu } from 'react-icons/fi';
import dynamic from 'next/dynamic';
import AddFolderForm from './AddFolderForm/AddFolderForm';
import Tree from './Tree/Tree';
import { useRouter } from 'next/dist/client/router';
import { cloneDeep } from 'lodash';

interface SidebarItemProps {
    icon?: any;
    label: string;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
}

const Overlay = ({ isOpen, close }: { isOpen: boolean; close: () => void }) => {
    return (
        <div
            className={`fixed top-0 left-0 z-10 w-screen h-screen  transition-all ease-in ${
                isOpen ? 'opacity-40 bg-black' : 'opacity-0 pointer-events-none'
            }`}
            onClick={(e) => {
                e.preventDefault();
                close();
            }}
        ></div>
    );
};
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
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
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

    const renameFolder = (id: number) => {
        const updateStruct = (item: TreeDataType) => {
            if (item.id === id) {
                item.isInput = true;
                return item;
            }

            item.children = item.children?.map(updateStruct);
            return item;
        };
        setStruct((prev) => {
            const clone = cloneDeep(prev);
            return clone.map(updateStruct);
        });
    };

    if (!data || isBaseError(data?.getTree)) return null;

    return (
        <>
            <div className="flex p-3 border-b item-center md:hidden">
                <button
                    onClick={() => {
                        setIsSidebarOpen(true);
                    }}
                >
                    <FiMenu size="24px" />
                </button>
            </div>
            <div
                className={`fixed w-[235px] z-[1] pt-5 z-[11] top-0 left-0  h-screen bg-sidebar transition-transform transform  ${
                    isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
                }`}
            >
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
                            router.push('/settings/account');
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
                <div className="pt-5">
                    <Tree
                        setStruct={setStruct}
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
                        renameFolder={renameFolder}
                        closePopup={() => setWillShowActions(false)}
                        folderId={Number(actionFolderId)}
                        style={{
                            top: Math.min(actionClickLocation.y + 4, window.innerHeight - 220),
                            left: Math.min(actionClickLocation.x + 2, window.innerWidth - 220),
                        }}
                    />
                )}
            </div>
            <Overlay isOpen={isSidebarOpen} close={() => setIsSidebarOpen(false)} />
        </>
    );
};
export default Sidebar;
