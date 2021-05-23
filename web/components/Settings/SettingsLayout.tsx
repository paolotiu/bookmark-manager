import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';
import React from 'react';
import { FiX } from 'react-icons/fi';

interface NavItemProps {
    href: string;
    label: string;
}
const NavItem = ({ href, label }: NavItemProps) => {
    const router = useRouter();
    const route = router.pathname;
    return (
        <Link href={href}>
            <span className={`text-sm ${route === href && 'font-medium text-primary'}`}>{label}</span>
        </Link>
    );
};

const SettingsLayout = () => {
    return (
        <>
            <div className="flex items-center justify-between px-5 py-3 text-xl border-b shadow-sm">
                <span className="">Settings</span>
                <Link href="/home/all">
                    <a>
                        <FiX size="1.25em" />
                    </a>
                </Link>
            </div>
            <nav className="flex justify-between p-5 bg-altBg">
                <NavItem href="/settings/account" label="Account" />
                <NavItem href="/settings/import" label="Import" />
                <NavItem href="/settings/import" label="Import" />
            </nav>
        </>
    );
};

export default SettingsLayout;
