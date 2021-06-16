import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useUserNameQuery } from '@graphql/generated/graphql';
import { DndProvider } from 'react-dnd-multi-backend';
import HTML5toTouch from 'react-dnd-multi-backend/dist/cjs/HTML5toTouch'; // or any other pipeline
import AllBookmarksView from './View/AllBookmarksView';
import DeletedBookmarksView from './View/DeletedBookmarksView';
import FolderView from './View/FolderView';
import NotFoundView from './View/NotFoundView';
import Sidebar from './Sidebar/Sidebar';

const Home = () => {
    const { data, loading } = useUserNameQuery({ fetchPolicy: 'network-only' });
    const router = useRouter();

    useEffect(() => {
        if (data?.me?.__typename === 'BaseError') {
            router.push('/login');
        }
    }, [data, router]);

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

    if (loading || !data || data.me?.__typename === 'BaseError') return null;

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
