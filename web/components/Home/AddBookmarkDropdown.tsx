import Button from '@components/Button/Button';
import ErrorMessage from '@components/General/ErrorMessage';
import { useCreateBookmarkMutation } from '@graphql/generated/graphql';
import { Transition } from '@headlessui/react';
import { useForm } from '@lib/useForm';
import React, { Fragment, useState } from 'react';
import * as yup from 'yup';

interface Props {
    onSubmit: () => void;
    folderId: number | string;
    isOpen: boolean;
}

const createBookmarkSchema = yup.object().shape({
    url: yup.string().url('Must be a valid URL'),
});
const AddBookmarkDropdown = ({ folderId, isOpen, onSubmit }: Props) => {
    const { inputs, handleChange, errors, isError, resetForm } = useForm(
        {
            url: '',
        },
        createBookmarkSchema,
    );
    const [willShowErrors, setWillShowErrors] = useState(false);
    const [createBookmark, { data: createBookmarkData }] = useCreateBookmarkMutation();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setWillShowErrors(true);
        if (isError) {
            // Prevent network call
            return;
        }

        const { data } = await createBookmark({
            variables: {
                folderId: Number(folderId),
                url: inputs.url,
            },
        });
        resetForm();
        onSubmit();
    };
    return (
        <Transition
            as={Fragment}
            show={isOpen}
            enter="transition transform duration-200"
            enterFrom="opacity-0 scale-95 translate-x-5 -translate-y-2"
            enterTo="opacity-100 translate-x-0 translate-y-0"
            leave="transition transform duration-100"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95 translate-x-5 -translate-y-2"
        >
            <div
                className={`absolute right-0 z-10  bg-white text-black shadow-lg top-[110%] w-[400px] max-w-[90vw] `}
                onMouseDown={(e) => {
                    e.stopPropagation();
                }}
            >
                <div className="p-3 ">
                    <form action="#" className="grid gap-3" onSubmit={handleSubmit}>
                        <div className="grid gap-1">
                            <label htmlFor="url">URL</label>
                            <input
                                type="text"
                                name="url"
                                className="px-2 py-1 text-sm border rounded-sm "
                                value={inputs.url}
                                onChange={handleChange}
                                placeholder="https://example.com"
                                autoComplete="off"
                            />
                            {willShowErrors && errors.url.message && (
                                <ErrorMessage size="small" text={errors.url.message} />
                            )}
                        </div>
                        <Button className="w-min justify-self-end no-outline" disabled={!inputs.url}>
                            Save
                        </Button>
                    </form>
                </div>
            </div>
        </Transition>
    );
};

export default AddBookmarkDropdown;
