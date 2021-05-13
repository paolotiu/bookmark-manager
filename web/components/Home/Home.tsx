import { useRouter } from 'next/dist/client/router';
import FolderView from './FolderView';

import Sidebar from './Sidebar';

const Home = () => {
    const router = useRouter();
    const { folderId } = router.query as { folderId: string | undefined };
    return (
        <div className="h-full">
            <Sidebar />
            <main className="flex justify-center h-full p-10 ml-sidebar-width">
                <div className="w-full h-full max-w-screen-lg">{folderId && <FolderView folderId={folderId} />}</div>
            </main>
        </div>
    );
};

export default Home;
