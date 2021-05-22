import { useDeleteFolderMutation } from '@graphql/generated/graphql';
import React, { CSSProperties, useEffect } from 'react';
import { BiTrash } from 'react-icons/bi';

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
    });
    useEffect(() => {
        window.addEventListener('mousedown', closePopup);

        return () => window.removeEventListener('mousedown', closePopup);
    }, [closePopup]);

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
            className="fixed z-50 py-2 bg-white rounded-sm shadow-lg"
            style={style}
            onMouseDown={(e) => {
                e.stopPropagation();
            }}
        >
            <button
                className="relative grid items-center grid-flow-col gap-2 px-2 py-1 text-sm hover:bg-hoverColor"
                onClick={handleDelete}
            >
                <BiTrash className="text-iconPassive" size="20px" />
                <span className="pt-[3px] whitespace-nowrap">Remove Folder</span>
            </button>
        </div>
    );
};

export default FolderActionsPopup;
