import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
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
    const [session, loading] = useSession();

    const router = useRouter();
    useEffect(() => {
        if (!loading && !session) {
            router.push('/');
        }
    }, [loading, router, session]);

    if (loading || !session) {
        return null;
    }

    return (
        <>
            <SettingsLayout>
                <div className="flex flex-col space-y-4">
                    <Field label="Email" value={session.user?.email || ''} />
                    <Field label="Name" value={session.user?.name || ''} />
                </div>
            </SettingsLayout>
        </>
    );
};

export default Account;
