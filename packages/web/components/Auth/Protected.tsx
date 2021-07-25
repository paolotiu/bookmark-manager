import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

interface Props {
    children: React.ReactNode;
}

const Protected = ({ children }: Props) => {
    const [session, loading] = useSession();

    const router = useRouter();

    useEffect(() => {
        if (!loading && !session) {
            router.push('/');
        }
    }, [loading, router, session]);

    if (loading || !session) return null;

    return <> {children} </>;
};

export default Protected;
