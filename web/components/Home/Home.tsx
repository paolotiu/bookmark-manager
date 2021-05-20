import { useRouter } from 'next/dist/client/router';
import React from 'react';
import { DndProvider } from 'react-dnd-multi-backend';
import HTML5toTouch from 'react-dnd-multi-backend/dist/cjs/HTML5toTouch'; // or any other pipeline

import DeletedBookmarksView from './DeletedBookmarksView';
import FolderView from './FolderView';

import Sidebar from './Sidebar';

const Home = () => {
    const router = useRouter();
    const { id: folderId } = router.query as { id: string | undefined };
    return (
        <DndProvider options={HTML5toTouch}>
            <div className="h-full">
                <Sidebar />
                <main className="flex justify-center h-full p-10 ml-sidebar-width">
                    <div className="w-full h-full max-w-screen-lg">
                        {folderId ? (
                            folderId === 'deleted' ? (
                                <DeletedBookmarksView />
                            ) : (
                                <FolderView folderId={Number(folderId)} />
                            )
                        ) : null}
                    </div>
                </main>
            </div>
        </DndProvider>
    );
};

export default Home;
