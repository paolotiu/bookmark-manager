import React, { useState } from 'react';
import { BiUser } from 'react-icons/bi';
import { AiOutlinePlus } from 'react-icons/ai';
import { FiBookmark, FiSettings, FiTrash, FiMenu } from 'react-icons/fi';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/client';
import AddFolderForm from '../AddFolderForm/AddFolderForm';
import Tree from '../Tree/Tree';
import AccountPopup from '../AccountPopup';
import SidebarItem, { SidebarItemType } from './SidebarItem';

const FolderActionsPopup = dynamic(() => import('../FolderActionsPopup/FolderActionsPopup'));

const Overlay = ({ isOpen, close }: { isOpen: boolean; close: () => void }) => {
    return (
        <div
            role="button"
            tabIndex={0}
            onKeyPress={(e) => {
                if (e.key === 'enter') {
                    close();
                }
            }}
            aria-label="Close Sidebar"
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

const Sidebar = () => {
    const router = useRouter();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [willShowNewFolderInput, setWillShowNewFolderInput] = useState(false);
    const [willShowActions, setWillShowActions] = useState<false | SidebarItemType>(false);
    const [actionClickLocation, setActionClickLocation] = useState({ x: 0, y: 0 });
    const [actionFolderId, setActionFolderId] = useState(0);
    const [session] = useSession();
    const closePopup = () => setWillShowActions(false);

    const handleSidebarItemClick = (e: React.MouseEvent<any>, item: SidebarItemType) => {
        e.preventDefault();
        setActionClickLocation({ x: e.clientX, y: e.clientY });
        setWillShowActions(item);
    };
    return (
        <>
            <div className="flex p-3 border-b item-center md:hidden">
                <button
                    type="button"
                    onClick={() => {
                        setIsSidebarOpen(true);
                    }}
                >
                    <FiMenu size="24px" />
                </button>
            </div>
            <div
                className={`fixed w-[300px] z-20 pt-5 top-0 left-0  h-screen bg-sidebar transition-transform transform  ${
                    isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
                }`}
            >
                <div className="relative">
                    <SidebarItem
                        icon={<BiUser size="20px" />}
                        label={session?.user?.name || ''}
                        onClick={(e) => {
                            handleSidebarItemClick(e, 'account');
                        }}
                    />
                    {willShowActions === 'account' && <AccountPopup closePopup={closePopup} />}
                </div>
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
                    <Tree handleItemClick={handleSidebarItemClick} setActionFolderId={setActionFolderId} />
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

                {willShowActions === 'folder' && (
                    <FolderActionsPopup
                        closePopup={closePopup}
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
