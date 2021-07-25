import Popup from '@components/Popup/Popup';
import { FiLogOut } from 'react-icons/fi';
import React from 'react';
import { useRouter } from 'next/dist/client/router';
import { signOut } from 'next-auth/client';

interface Props {
    closePopup: () => void;
}
const AccountPopup = ({ closePopup }: Props) => {
    const router = useRouter();
    return (
        <Popup className="absolute top-[110%] left-4" closePopup={closePopup}>
            <Popup.Item
                label="Log out"
                Icon={FiLogOut}
                iconSize="18px"
                onClick={async () => {
                    signOut({ redirect: false });
                    router.push('/login');
                }}
            />
        </Popup>
    );
};

export default AccountPopup;
