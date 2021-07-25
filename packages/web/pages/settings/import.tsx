import Protected from '@components/Auth/Protected';
import Import from '@components/Settings/Import';
import React from 'react';

const ImportPage = () => {
    return (
        <Protected>
            <Import />
        </Protected>
    );
};

export default ImportPage;
