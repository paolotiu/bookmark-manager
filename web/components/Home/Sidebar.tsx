import React, { useMemo } from 'react';
import { KremeProvider, Tree } from 'kreme';
import { Folder, useTree_QueryQuery } from '@graphql/generated/graphql';
import { useRouter } from 'next/dist/client/router';
import { isBaseError } from '@graphql/helpers';

interface FolderWithFolderType extends Folder {
    type: 'folder';
    children: [] | FolderWithFolderType[];
}

const Sidebar = () => {
    const { data } = useTree_QueryQuery();
    const router = useRouter();
    const struct = useMemo<FolderWithFolderType[]>(() => {
        if (!data || isBaseError(data.getTree)) {
            return [];
        }

        return JSON.parse(data.getTree.tree || '[]');
    }, [data]);
    if (!data || isBaseError(data.getTree)) return null;

    return (
        <div className="fixed w-[200px] h-screen bg-sidebar">
            <KremeProvider>
                <Tree
                    data={struct}
                    noDropOnEmpty
                    onFolderClick={(id) => {
                        router.push(`home/?folderId=${id}`, undefined, { shallow: true });
                    }}
                />
            </KremeProvider>
        </div>
    );
};
export default Sidebar;
