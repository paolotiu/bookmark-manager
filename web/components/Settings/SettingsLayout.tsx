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
    const isActive = route === href;
    return (
        <Link href={href}>
            <a
                className={`md:p-2 px-4 py-2 rounded-sm w-1/3 md:w-full md:text-left md:block text-center hover:bg-white ${
                    isActive && 'bg-white'
                }`}
            >
                <span className={`text-sm ${isActive && 'font-bold text-primary'}`}>{label}</span>
            </a>
        </Link>
    );
};

interface Props {
    children?: React.ReactNode;
}

const SettingsLayout = ({ children }: Props) => {
    return (
        <>
            <div className="h-full bg-altBg">
                <div className="fixed z-10 flex items-center justify-center w-full px-8 bg-white border-b shadow-sm h-11">
                    {/* <div className="flex items-center justify-between w-full max-w-[900px] px-4 py-4 text-xl max-w-screen "> */}
                    <span className="w-[250px] md:pl-8">Settings</span>
                    <div className="w-3/4 md:max-w-[704px]">
                        <Link href="/home/all">
                            <a className="flex items-center float-right py-2">
                                <FiX size="1.25em" />
                            </a>
                        </Link>
                    </div>
                    {/* </div> */}
                </div>
                <div className="flex flex-col items-stretch min-h-screen md:flex-row md:justify-center">
                    <nav className="flex justify-between pt-16 pb-4 md:justify-start md:w-64 md:p-8 md:flex-col md:pt-28 bg-altBg">
                        <NavItem href="/settings/account" label="Account" />
                        <NavItem href="/settings/import" label="Import" />
                        <NavItem href="/settings/integrations" label="Integrations" />
                    </nav>

                    <main className="md:w-3/4 md:max-w-[700px] max-w-full md:pt-28 md:px-8 px-8 pt-8 bg-white flex-1">
                        {children}
                    </main>
                </div>
            </div>
        </>
    );
};

export default SettingsLayout;
