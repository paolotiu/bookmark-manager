import Button from '@components/Button/Button';
import { TREE_QUERY } from '@graphql/folder/treeQuery';
import { useCreateFolderWithBookmarksMutation } from '@graphql/generated/graphql';
import React, { useState } from 'react';
import { series } from 'async';
import { useReactiveVar } from '@apollo/client';
import { importProgressVar, isImportingVar } from '@lib/apolloClient';
import SettingsLayout from './SettingsLayout';

const UploadFileButton = ({
    handleUpload,
    label,
    children,
}: {
    handleUpload: React.ChangeEventHandler<HTMLInputElement>;
    label?: string;
    children?: React.ReactNode;
}) => {
    return (
        <label htmlFor="import">
            {label}
            {children}
            <input
                type="file"
                name="import"
                accept="text/html"
                id="import"
                onChange={handleUpload}
                className="hidden"
            />
        </label>
    );
};

const ProgressBar = ({ progress }: { progress: number }) => {
    return (
        <div className="relative pt-1 col-span-full">
            <div className="flex items-center justify-between mb-2">
                <div>
                    <span className="inline-block px-2 py-1 text-xs font-semibold uppercase text-primary">
                        {progress === 100 ? 'Finished!' : 'Importing...'}
                    </span>
                </div>
                <div className="text-right">
                    <span className="inline-block text-xs font-semibold text-primary">{progress}%</span>
                </div>
            </div>
            <div className="flex h-2 mb-4 overflow-hidden text-xs rounded bg-primary bg-opacity-30">
                <div className=" bg-primary" style={{ width: `${progress}%` }}></div>
            </div>
        </div>
    );
};

interface Folders {
    [key: string]: { title: string; url: string }[];
}

const getCategory = (a: Element) => {
    return a.closest('DL')?.previousElementSibling?.textContent || false;
};
const Import = () => {
    const [createFolderWithBookmarks] = useCreateFolderWithBookmarksMutation({
        awaitRefetchQueries: true,
        refetchQueries: [{ query: TREE_QUERY }],
    });

    const isImporting = useReactiveVar(isImportingVar);
    const progress = useReactiveVar(importProgressVar);
    const [file, setFile] = useState<File>();
    const [folders, setFolders] = useState<Folders>({});

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        importProgressVar(0);
        isImportingVar(false);
        if (!e.target.files) return;

        const map: { [key: string]: { title: string; url: string }[] } = {};
        const reader = new FileReader();

        reader.onload = (event) => {
            if (event.target?.readyState !== 2) return;
            if (event.target.error) {
                return;
            }

            const html = event.target.result;
            if (typeof html !== 'string') return;
            const el = document.createElement('html');
            el.innerHTML = html;
            const a = el.querySelectorAll('a');

            a.forEach((anchor) => {
                const title = anchor.text;
                const url = anchor.getAttribute('href') || '';
                const category = getCategory(anchor);
                if (!category) return;

                if (map[category]) {
                    map[category].push({ title, url });
                    return;
                }
                map[category] = [{ title, url }];
            });

            setFolders(map);
        };
        setFile(e.target.files[0]);
        reader.readAsText(e.target.files[0]);
    };

    const startImport = async () => {
        // Show progress bar
        isImportingVar(true);

        const totalFolders = Object.keys(folders).length;

        series(
            Object.entries(folders).map(([key, bookmarks]) => {
                return async (cb: any) => {
                    await createFolderWithBookmarks({ variables: { bookmarks, folderName: key } });
                    importProgressVar(Math.min(100, importProgressVar() + 100 / totalFolders));

                    cb(null);
                };
            }),
        );
    };

    const hasFolders = !!Object.keys(folders).length;
    return (
        <>
            <SettingsLayout>
                <div className="grid grid-cols-2 gap-5 pt-0">
                    <div className="col-span-full">
                        <span className="mr-2 ">File: </span>
                        {file && hasFolders ? (
                            <>
                                <span className="font-medium">{file.name}</span>
                                <div className="text-sm text-inactiveSidebar">
                                    Folders: {Object.keys(folders).length}, Bookmarks:{' '}
                                    {Object.values(folders).reduce((acc, curr) => acc + curr.length, 0)}
                                </div>
                            </>
                        ) : null}
                        {!file ? <span className="text-inactiveSidebar">No file uploaded</span> : null}
                        {file && !hasFolders ? (
                            <>
                                <span className="font-medium text-red-500">No bookmarks</span>
                            </>
                        ) : null}
                    </div>
                    {isImporting ? (
                        <>
                            <ProgressBar progress={progress} />
                            {progress === 100 && (
                                <UploadFileButton handleUpload={handleUpload}>
                                    <Button isSecondary className="font-normal pointer-events-none whitespace-nowrap">
                                        Upload another file
                                    </Button>
                                </UploadFileButton>
                            )}
                        </>
                    ) : (
                        <div className="pt-5">
                            {file ? (
                                <div className="box-border flex items-stretch col-span-full">
                                    {hasFolders ? (
                                        <Button className="h-auto mr-5 " onClick={startImport}>
                                            Import
                                        </Button>
                                    ) : null}
                                    <UploadFileButton handleUpload={handleUpload}>
                                        <Button
                                            isSecondary
                                            className="font-normal pointer-events-none whitespace-nowrap"
                                        >
                                            Upload another file
                                        </Button>
                                    </UploadFileButton>
                                </div>
                            ) : (
                                <UploadFileButton handleUpload={handleUpload}>
                                    <Button className="pointer-events-none">Upload file</Button>
                                </UploadFileButton>
                            )}
                        </div>
                    )}
                    <div className="h-[1px] col-span-full bg-gray-300"></div>
                </div>
            </SettingsLayout>
        </>
    );
};

export default Import;
