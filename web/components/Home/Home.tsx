import { useRouter } from 'next/dist/client/router';
import React from 'react';
import DeletedBookmarksView from './DeletedBookmarksView';
import FolderView from './FolderView';

import Sidebar from './Sidebar';

const Home = () => {
    const router = useRouter();
    const { id: folderId } = router.query as { id: string | undefined };
    return (
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
    );
};

export default Home;
