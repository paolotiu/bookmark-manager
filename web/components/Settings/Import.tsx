import Button from '@components/Button/Button';
import { TREE_QUERY } from '@graphql/folder/treeQuery';
import { useCreateFolderWithBookmarksMutation } from '@graphql/generated/graphql';
import React, { useState } from 'react';
import SettingsLayout from './SettingsLayout';

const getCategory = (a: Element) => {
    return a.closest('DL')?.previousElementSibling?.textContent || '';
};

const UploadFileButton = ({
    setFile,
    label,
    children,
}: {
    setFile: React.Dispatch<React.SetStateAction<File | null | undefined>>;
    label?: string;
    children?: React.ReactNode;
}) => {
    return (
        <label
            role="button"
            htmlFor="import"
            onClick={() => {
                console.log('hey');
            }}
        >
            {label}
            {children}
            <input
                type="file"
                name="import"
                accept="text/html"
                id="import"
                onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
                className="hidden"
            />
        </label>
    );
};

const Import = () => {
    const [createFolderWithBookmarks] = useCreateFolderWithBookmarksMutation({
        awaitRefetchQueries: true,
        refetchQueries: [{ query: TREE_QUERY }],
    });

    const [file, setFile] = useState<File | null>();

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const { target } = e;
        if (target.validity.valid && target.files) {
            const map: { [key: string]: { title: string; url: string }[] } = {};

            const file = await target.files[0].arrayBuffer();
            const html = Buffer.from(file).toString('utf8');
            const el = document.createElement('html');
            el.innerHTML = html;
            const a = el.querySelectorAll('a');

            a.forEach((anchor) => {
                const title = anchor.text;
                const url = anchor.getAttribute('href') || '';
                const category = getCategory(anchor);
                if (map[category]) {
                    map[category].push({ title, url });
                    return;
                }
                map[category] = [{ title, url }];
            });
            Object.entries(map).forEach(([key, bookmarks]) => {
                createFolderWithBookmarks({ variables: { bookmarks, folderName: key } });
            });
        }
    };

    return (
        <>
            <SettingsLayout>
                <div className="grid grid-cols-2 gap-5 pt-0">
                    <div className="col-span-full">
                        <span className="mr-2 ">File: </span>
                        {file ? (
                            <span className="font-medium">{file.name}</span>
                        ) : (
                            <span className="text-inactiveSidebar">No file uploaded</span>
                        )}
                    </div>
                    <div className="pt-5">
                        {file ? (
                            <div className="box-border flex items-stretch col-span-full">
                                <Button className="h-auto mr-5 ">Import</Button>
                                <UploadFileButton setFile={setFile}>
                                    <Button isSecondary className="font-normal pointer-events-none whitespace-nowrap">
                                        Upload another file
                                    </Button>
                                </UploadFileButton>
                            </div>
                        ) : (
                            <UploadFileButton setFile={setFile}>
                                <Button className="pointer-events-none">Upload file</Button>
                            </UploadFileButton>
                        )}
                    </div>
                    <div className="h-[1px] col-span-full bg-gray-300"></div>
                </div>
            </SettingsLayout>
        </>
    );
};

export default Import;
