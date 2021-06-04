import { useChangePasswordMutation } from '@graphql/generated/graphql';
import { useForm } from '@lib/useForm';
import { useRouter } from 'next/router';
import jwt from 'jsonwebtoken';
import { FiCheckCircle } from 'react-icons/fi';
import React, { useEffect, useState } from 'react';
import * as yup from 'yup';
import Link from 'next/link';
import Auth from './Auth';

interface ChangePasswordUser {
    email: string;
    token: string;
}
const schema = yup.object().shape({
    password: yup.string().min(8, 'Must be at least 8 characters').required('Password is Required'),
});

interface ContentProps {
    children: React.ReactNode;
    fallback: React.ReactNode;
    success: React.ReactNode;
    isVerifying: boolean;
    isTokenValid: boolean;
    isSuccess: boolean;
}
const Content = ({ children, isTokenValid, isVerifying, fallback, isSuccess, success }: ContentProps) => {
    if (isVerifying) return null;
    if (!isTokenValid) return <> {fallback} </>;
    if (isSuccess) return <> {success} </>;
    return <>{children}</>;
};

const ChangePassword = () => {
    const router = useRouter();
    const { inputs, errors, isEmpty, isError, handleChange } = useForm({ password: '' }, schema);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isVerifying, setIsVerifying] = useState(true);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState('');
    const [user, setUser] = useState<ChangePasswordUser>();
    const [isTokenValid, setIsTokenValid] = useState(true);
    const [changePassword] = useChangePasswordMutation();
    const { token } = router.query as { token: string };

    useEffect(() => {
        if (!router.isReady) return;
        try {
            const payload = jwt.decode(token as string);
            if (payload) {
                const { email, token: changePasswordToken } = payload as { [key: string]: string };
                setUser({ email, token: changePasswordToken });
                setIsTokenValid(true);
            } else {
                setIsTokenValid(false);
            }
        } catch (e) {
            setIsTokenValid(false);
        } finally {
            setIsVerifying(false);
        }
    }, [router, token]);

    const handleSubmit: React.FormEventHandler = async (e) => {
        e.preventDefault();
        if (!user) return;
        setIsSubmitting(true);
        const { data } = await changePassword({
            variables: { email: user.email, password: inputs.password, resetToken: user.token },
        });
        if (data?.changePassword.__typename === 'BaseError') {
            setError(data.changePassword.message);
        } else {
            setIsSuccess(true);
            setError('');
        }

        setIsSubmitting(false);
    };
    return (
        <Content
            isSuccess={isSuccess}
            isTokenValid={isTokenValid}
            isVerifying={isVerifying}
            fallback={
                <Auth title="Change Password">
                    <h4>The token is not valid</h4>
                    <Auth.Divider lineOnly />
                    <Link href="/forgot" passHref>
                        <a href="forgot" className="text-primary hover:underline">
                            Forgot Password?
                        </a>
                    </Link>
                </Auth>
            }
            success={
                <Auth noTitle>
                    <div className="flex flex-col items-center space-y-3">
                        <div className="py-4 text-success">
                            <FiCheckCircle size="80px" strokeWidth={1} />
                        </div>

                        <h2 className="text-xl font-medium">Password Changed!</h2>
                        <div className="text-center">
                            <p>Your password has been changed succesfully.</p>
                            <p>
                                Use your new password to{' '}
                                <Link href="/login" passHref>
                                    <a href="login" className="text-primary hover:underline">
                                        log in.
                                    </a>
                                </Link>
                            </p>
                        </div>
                    </div>
                </Auth>
            }
        >
            <Auth title="Change Password" subtitle={`Enter the new password for ${user?.email}`}>
                <Auth.Form handleSubmit={handleSubmit}>
                    <Auth.Input
                        label="New Password"
                        name="password"
                        type="password"
                        onChange={handleChange}
                        errorMessage={error || errors.password.message}
                        isErrorShown={(isError && !isEmpty) || !!error.length}
                    />
                    <Auth.Submit
                        isSubmitting={isSubmitting}
                        label="Change Password"
                        disabled={isEmpty || isError || isSubmitting}
                    />
                </Auth.Form>
            </Auth>
        </Content>
    );
};

export default ChangePassword;
