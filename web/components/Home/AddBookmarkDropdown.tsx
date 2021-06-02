import Button from '@components/Button/Button';
import dynamic from 'next/dynamic';
import ErrorMessage from '@components/Form/ErrorMessage';
import { useCreateBookmarkMutation } from '@graphql/generated/graphql';
import { Transition } from '@headlessui/react';
import { useForm } from '@lib/useForm';
import React, { Fragment, useEffect, useState } from 'react';
import * as yup from 'yup';
import { isValidUrl } from '@lib/isValidUrl';
import { addBookmarksToAll, addBookmarksToFolder } from './cacheUpdates';
import clsx from 'clsx';
const Spinner = dynamic(() => import('@components/Spinner/Spinner'));

interface Props {
    folderId: number | string | null;
    isOpen: boolean;
    closeDropDown: () => void;
}
const createBookmarkSchema = yup.object().shape({
    url: yup
        .string()
        .test('is-url-valid', 'URL is not valid', (value) => {
            return isValidUrl(value);
        })
        .required(''),
});
const AddBookmarkDropdown = ({ folderId, isOpen, closeDropDown }: Props) => {
    const { inputs, handleChange, errors, isError, resetForm } = useForm(
        {
            url: '',
        },
        createBookmarkSchema,
    );

    useEffect(() => {
        // Close dropdown on outside click
        window.addEventListener('mousedown', closeDropDown);
        return () => {
            setWillShowErrors(false);
            window.removeEventListener('mousedown', closeDropDown);
        };
    }, [closeDropDown]);

    const [isSaving, setIsSaving] = useState(false);
    const [willShowErrors, setWillShowErrors] = useState(false);
    const [createBookmark] = useCreateBookmarkMutation({
        update(cache, { data }) {
            if (data && data.createBookmark.__typename === 'Bookmark') {
                if (folderId) {
                    addBookmarksToFolder(cache, {
                        bookmarks: [data.createBookmark],
                        folderId: Number(folderId),
                    });
                }

                addBookmarksToAll(cache, { bookmarks: [data.createBookmark] });
            }
        },
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setWillShowErrors(true);
        if (isError) {
            // Prevent network call
            return;
        }

        setIsSaving(true);
        const { data } = await createBookmark({
            variables: {
                folderId: folderId ? Number(folderId) : null,
                url: inputs.url,
            },
        });
        if (data?.createBookmark.__typename === 'InputValidationError') {
        }
        if (data?.createBookmark.__typename === 'BaseError') {
        }

        setIsSaving(false);
        resetForm();
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
                                className="px-2 py-1 text-sm border rounded-sm "
                                value={inputs.url}
                                onChange={handleChange}
                                placeholder="https://example.com"
                                autoComplete="off"
                                name="url"
                            />
                            {willShowErrors && errors.url.message && (
                                <ErrorMessage size="small" className="pl-1" text={errors.url.message} />
                            )}
                        </div>
                        <Button
                            className={`relative w-min justify-self-end no-outline`}
                            type="submit"
                            disabled={isSaving || isError}
                        >
                            <div
                                className={clsx('absolute w-full h-full', willShowErrors && 'hidden')}
                                onClick={() => setWillShowErrors(true)}
                            ></div>
                            <p className={`${isSaving && 'invisible'}`}>Save</p>
                            <Spinner showSpinner={isSaving} />
                        </Button>
                    </form>
                </div>
            </div>
        </Transition>
    );
};

export default AddBookmarkDropdown;
