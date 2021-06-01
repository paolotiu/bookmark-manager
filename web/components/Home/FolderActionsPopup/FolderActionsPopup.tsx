import Popup from '@components/Popup/Popup';
import { useDeleteFolderMutation } from '@graphql/generated/graphql';
import { treeVar } from '@lib/apolloClient';
import { TreeDataType } from 'kreme/build/Tree/types';
import { cloneDeep } from 'lodash';
import React, { CSSProperties, useEffect } from 'react';
import { BiTrash } from 'react-icons/bi';
import { BsPencilSquare } from 'react-icons/bs';
import { removeFolderFromCache } from '../cacheUpdates';

interface Props {
    folderId: number;
    style?: CSSProperties;
    closePopup: () => void;
    onDelete?: () => void;
}

const FolderActionsPopup = ({ folderId, style, closePopup, onDelete }: Props) => {
    const [deleteFolder] = useDeleteFolderMutation({
        awaitRefetchQueries: true,
        refetchQueries: ['getTree'],
        update(cache) {
            removeFolderFromCache(cache, { folderId });
        },
    });

    const initiateFolderRename = (id: number) => {
        const updateTree = (item: TreeDataType) => {
            if (item.id === id) {
                item.isInput = true;
                return item;
            }

            item.children = item.children?.map(updateTree);
            return item;
        };

        const cloned = cloneDeep(treeVar());
        treeVar(cloned.map(updateTree));
    };

    const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        await deleteFolder({ variables: { id: folderId } });
        if (onDelete) {
            onDelete();
        }
        closePopup();
    };

    return (
        <Popup style={style} closePopup={closePopup}>
            <Popup.Item onClick={handleDelete} label="Delete" Icon={BiTrash} />
            <Popup.Item
                onClick={() => {
                    initiateFolderRename(folderId);
                    closePopup();
                }}
                label="Rename"
                Icon={BsPencilSquare}
                iconSize="18px"
            />
        </Popup>
    );
};

export default FolderActionsPopup;
