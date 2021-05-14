import React, { useMemo } from 'react';
import { KremeProvider, Tree } from 'kreme';
import { Folder, useTree_QueryQuery } from '@graphql/generated/graphql';
import { useRouter } from 'next/dist/client/router';
import { isBaseError } from '@graphql/helpers';
import Link from 'next/link';

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
                        router.push('/home/' + id, undefined, {});
                    }}
                />
                <Link href="/home/deleted">
                    <div>Trash</div>
                </Link>
            </KremeProvider>
        </div>
    );
};
export default Sidebar;
