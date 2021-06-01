import Popup from '@components/Popup/Popup';
import { FiLogOut } from 'react-icons/fi';
import React from 'react';
import { useRouter } from 'next/dist/client/router';
import { useLogoutMutation } from '@graphql/generated/graphql';

interface Props {
    closePopup: () => void;
}
const AccountPopup = ({ closePopup }: Props) => {
    const router = useRouter();
    const [logout] = useLogoutMutation();
    return (
        <Popup className="absolute top-[110%] left-4" closePopup={closePopup}>
            <Popup.Item
                label="Log out"
                Icon={FiLogOut}
                iconSize="18px"
                onClick={async () => {
                    await logout();
                    router.push('/');
                }}
            />
        </Popup>
    );
};

export default AccountPopup;
