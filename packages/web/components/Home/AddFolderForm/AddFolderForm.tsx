import { useCreateFolderMutation } from '@graphql/generated/graphql';
import { useForm } from '@lib/useForm';
import React, { useEffect, useRef, useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';

interface Props {
    closeForm: () => void;
}

const AddFolderForm = ({ closeForm }: Props) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [createFolder] = useCreateFolderMutation({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        // Focus on mount
        inputRef.current?.focus();
        window.addEventListener('mousedown', closeForm);
        return () => {
            window.removeEventListener('mousedown', closeForm);
        };
    }, [closeForm]);

    const { inputs, handleChange, clearForm } = useForm({ name: '' });
    return (
        <form
            onSubmit={async (e) => {
                setIsSubmitting(true);
                e.preventDefault();
                if (!(inputs.name.trim() === '')) {
                    await createFolder({
                        variables: { name: inputs.name },
                        refetchQueries: ['getTree'],
                        awaitRefetchQueries: true,
                    });
                }

                clearForm();
                setIsSubmitting(false);
                closeForm();
            }}
            className="text-sm"
        >
            <div
                className="grid items-center grid-flow-col gap-1 pl-4 pr-2"
                style={{ gridTemplateColumns: '20px 1fr' }}
            >
                <button type="submit" className="flex items-center justify-center" disabled={isSubmitting}>
                    <AiOutlinePlus className="opacity-50" />
                </button>
                <input
                    disabled={isSubmitting}
                    ref={inputRef}
                    type="text"
                    name="name"
                    onChange={handleChange}
                    value={inputs.name}
                    placeholder="New Folder"
                    className="py-1 bg-transparent border-b focus:outline-none focus-within:outline-default"
                />
            </div>
        </form>
    );
};

export default AddFolderForm;
