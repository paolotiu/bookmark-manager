import { useUserNameQuery } from '@graphql/generated/graphql';
import { useRouter } from 'next/dist/client/router';
import React, { useEffect } from 'react';
import { DndProvider } from 'react-dnd-multi-backend';
import HTML5toTouch from 'react-dnd-multi-backend/dist/cjs/HTML5toTouch'; // or any other pipeline
import AllBookmarksView from './AllBookmarksView';
import DeletedBookmarksView from './DeletedBookmarksView';
import FolderView from './FolderView';
import NotFoundView from './NotFoundView';
import Sidebar from './Sidebar';

const Home = () => {
    const { data, loading } = useUserNameQuery();
    const router = useRouter();

    useEffect(() => {
        if (data?.me?.__typename === 'BaseError') {
            router.push('/login');
        }
    }, [data, router]);

    if (loading || !data || data.me?.__typename === 'BaseError') return null;
    const { id: folderId } = router.query as { id: string | undefined };

    return (
        <DndProvider options={HTML5toTouch} key={1}>
            <div className="h-full">
                <Sidebar />
                <main className="flex justify-center p-2 sm:p-10 md:ml-sidebar-width">
                    <div className="w-full h-full max-w-screen-xl">
                        {folderId ? (
                            folderId === 'deleted' ? (
                                <DeletedBookmarksView />
                            ) : folderId === 'all' ? (
                                <AllBookmarksView />
                            ) : (
                                <FolderView folderId={Number(folderId)} />
                            )
                        ) : (
                            <NotFoundView />
                        )}
                    </div>
                </main>
            </div>
        </DndProvider>
    );
};

export default Home;
