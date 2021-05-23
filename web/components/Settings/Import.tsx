import { TREE_QUERY } from '@graphql/folder/treeQuery';
import { useCreateFolderWithBookmarksMutation } from '@graphql/generated/graphql';
import React from 'react';
import SettingsLayout from './SettingsLayout';

const getCategory = (a: Element) => {
    return a.closest('DL')?.previousElementSibling?.textContent || '';
};
const Import = () => {
    const [createFolderWithBookmarks] = useCreateFolderWithBookmarksMutation({
        awaitRefetchQueries: true,
        refetchQueries: [{ query: TREE_QUERY }],
    });
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
            <SettingsLayout />
            <main className="px-5 pt-4">Import</main>

            <input type="file" onChange={handleChange} />
        </>
    );
};

export default Import;
