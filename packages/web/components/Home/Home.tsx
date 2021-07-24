import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { DndProvider } from 'react-dnd-multi-backend';
import HTML5toTouch from 'react-dnd-multi-backend/dist/cjs/HTML5toTouch'; // or any other pipeline
import { useSession } from 'next-auth/client';
import AllBookmarksView from './View/AllBookmarksView';
import DeletedBookmarksView from './View/DeletedBookmarksView';
import FolderView from './View/FolderView';
import NotFoundView from './View/NotFoundView';
import Sidebar from './Sidebar/Sidebar';

const Home = () => {
    const [session, loading] = useSession();

    const router = useRouter();

    useEffect(() => {
        if (!session && !loading) {
            router.push('/login');
        }
    }, [loading, router, session]);

    const { id: folderId } = router.query as { id: string | undefined };

    const renderView = () => {
        if (folderId === 'deleted') {
            return <DeletedBookmarksView />;
        }
        if (folderId === 'all') {
            return <AllBookmarksView />;
        }
        if (folderId) {
            return <FolderView folderId={Number(folderId)} />;
        }
        return <NotFoundView />;
    };

    if (loading) return null;

    return (
        <DndProvider options={HTML5toTouch} key={1}>
            <div className="h-full">
                <Sidebar />
                <main className="flex justify-center p-2 sm:p-10 md:ml-sidebar-width">
                    <div className="w-full h-full max-w-screen-xl">{renderView()}</div>
                </main>
            </div>
        </DndProvider>
    );
};

export default Home;
