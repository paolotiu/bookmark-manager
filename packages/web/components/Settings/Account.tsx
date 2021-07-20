import { User } from '@entity/User';
import { useMeQuery } from '@graphql/generated/graphql';
import { isBaseError } from '@graphql/shared/errorMessages';
import React from 'react';
import SettingsLayout from './SettingsLayout';

interface FieldProps {
    label: string;
    value: string;
}
const Field = ({ label, value }: FieldProps) => {
    return (
        <div className="flex flex-col space-y-1">
            <h4 className="font-bold">{label}</h4>
            <p className="text-sm">{value}</p>
        </div>
    );
};
const Account = () => {
    const { data, loading } = useMeQuery();

    if (!data || isBaseError(data.me) || loading || !data.me) {
        return null;
    }

    const { email, name } = data.me as Pick<User, 'email' | 'name'>;

    return (
        <>
            <SettingsLayout>
                <div className="flex flex-col space-y-4">
                    <Field label="Email" value={email} />
                    <Field label="Name" value={name} />
                </div>
            </SettingsLayout>
        </>
    );
};

export default Account;
