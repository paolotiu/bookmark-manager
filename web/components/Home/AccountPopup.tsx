import Popup from '@components/Popup/Popup';
import { FiLogOut } from 'react-icons/fi';
import React from 'react';
import { useRouter } from 'next/dist/client/router';
import { useLogoutMutation } from '@graphql/generated/graphql';

interface Props {
    style: React.CSSProperties;
}

const AccountPopup = ({ style }: Props) => {
    const router = useRouter();
    const [logout] = useLogoutMutation();
    return (
        <Popup style={style}>
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
