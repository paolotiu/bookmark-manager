import React, { useMemo } from 'react';
import { Tree } from 'kreme';
import { TreeDataType } from 'kreme/build/Tree/types';
import { BaseError, Folder, useTree_QueryQuery } from '@graphql/generated/graphql';

const dataasd: TreeDataType[] = [
    {
        id: 1,
        name: 'bruh',
        type: 'folder',
    },
];

interface FolderWithFolderType extends Folder {
    type: 'folder';
    children: [] | FolderWithFolderType[];
}

const Sidebar = () => {
    const { data } = useTree_QueryQuery();

    const struct = useMemo<FolderWithFolderType[]>(() => {
        if (!data || isBaseError(data.getTree)) {
            return [];
        }

        return JSON.parse(data.getTree.tree || '[]');
    }, [data]);
    if (!data || isBaseError(data.getTree)) return null;
    console.log(struct);

    return (
        <div className="fixed w-[200px] h-screen bg-gray-300">
            <Tree
                data={struct}
                noDropOnEmpty
                onFolderClick={(id) => {
                    console.log(id);
                }}
            />
        </div>
    );
};

function isBaseError(obj: unknown): obj is BaseError {
    return (obj as BaseError).message !== undefined && (obj as BaseError).path !== undefined;
}

export default Sidebar;
