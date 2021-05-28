import { useDeleteFolderMutation } from '@graphql/generated/graphql';
import { treeVar } from '@lib/apolloClient';
import { TreeDataType } from 'kreme/build/Tree/types';
import { cloneDeep } from 'lodash';
import React, { CSSProperties, useEffect } from 'react';
import { IconType } from 'react-icons';
import { BiTrash } from 'react-icons/bi';
import { BsPencilSquare } from 'react-icons/bs';
import { removeFolderFromCache } from '../cacheUpdates';

interface Props {
    folderId: number;
    style?: CSSProperties;
    closePopup: () => void;
    onDelete?: () => void;
}

interface FolderActionProps {
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    Icon?: IconType;
    label: string;
    iconSize?: string;
}
const FolderAction = ({ onClick, Icon, label, iconSize }: FolderActionProps) => {
    return (
        <button
            className="relative w-full grid items-center grid-flow-col gap-2 px-2 py-1 grid-cols-[20px,min-content] text-sm hover:bg-hoverColor"
            onClick={onClick}
        >
            {Icon && <Icon className="text-iconPassive" size={iconSize || '20px'} />}
            <span className="pt-[3px] whitespace-nowrap">{label}</span>
        </button>
    );
};
const FolderActionsPopup = ({ folderId, style, closePopup, onDelete }: Props) => {
    const [deleteFolder] = useDeleteFolderMutation({
        awaitRefetchQueries: true,
        refetchQueries: ['getTree'],
        update(cache) {
            removeFolderFromCache(cache, { folderId });
        },
    });

    useEffect(() => {
        window.addEventListener('mousedown', closePopup);

        return () => window.removeEventListener('mousedown', closePopup);
    }, [closePopup]);

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
        <div
            className="fixed top-0 left-0 z-50 py-2 bg-white rounded-sm shadow-lg min-w-[200px] max-w-[90vw]"
            style={style}
            onMouseDown={(e) => {
                e.stopPropagation();
            }}
        >
            <FolderAction onClick={handleDelete} label="Delete" Icon={BiTrash} />
            <FolderAction
                onClick={() => {
                    initiateFolderRename(folderId);
                    closePopup();
                }}
                label="Rename"
                Icon={BsPencilSquare}
                iconSize="18px"
            />
        </div>
    );
};

export default FolderActionsPopup;
