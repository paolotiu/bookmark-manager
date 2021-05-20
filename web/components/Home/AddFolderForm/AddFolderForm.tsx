import { useCreateFolderMutation } from '@graphql/generated/graphql';
import { useForm } from '@lib/useForm';
import React from 'react';
import { AiOutlinePlus } from 'react-icons/ai';

const AddFolderForm = () => {
    const [createFolder] = useCreateFolderMutation({});

    const { inputs, handleChange } = useForm({ name: '' });
    return (
        <form
            onSubmit={async (e) => {
                e.preventDefault();
                await createFolder({
                    variables: { name: inputs.name },
                    refetchQueries: ['getTree'],
                    awaitRefetchQueries: true,
                });
            }}
            className="text-sm"
        >
            <div className="grid grid-flow-col pl-2 pr-2">
                <button type="submit" className="flex items-center justify-center">
                    <AiOutlinePlus />
                </button>
                <input
                    type="text"
                    name="name"
                    onChange={handleChange}
                    placeholder="New Folder"
                    className="p-1 bg-transparent border-b"
                />
            </div>
        </form>
    );
};

export default AddFolderForm;
