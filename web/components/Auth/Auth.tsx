import ErrorMessage from '@components/Form/ErrorMessage';
import { InputProps } from '@components/Form/Input';
import NormalInput from '@components/Form/Input';
import React from 'react';
import Button, { ButtonProps } from '@components/Button/Button';
import { Divider as KremeDivider } from 'kreme';
import Spinner from '@components/Spinner/Spinner';
import clsx from 'clsx';

const Wrapper = ({ children }: { children?: React.ReactNode }) => {
    return (
        <div className="flex items-start justify-center min-h-screen sm:bg-gray-50 sm:pt-7">
            <div className={`p-8 pt-3   w-full sm:w-[460px] bg-white sm:border `}>{children}</div>{' '}
        </div>
    );
};

const SocialButton = ({ Icon, label }: { Icon?: React.ReactNode; label?: string }) => {
    return (
        <button className="flex items-center justify-center w-full px-4 py-2 border rounded-sm no-outline">
            {Icon}
            <span className="mt-[2px]">{label}</span>
        </button>
    );
};

interface FormProps {
    handleSubmit: React.FormEventHandler;
    children?: React.ReactNode;
}

const FormInputs = ({ children }: { children?: React.ReactNode }) => {
    return <div className="grid gap-8">{children}</div>;
};

const Input = ({
    label,
    name,
    type,
    placeholder = '',
    errorMessage,
    isErrorShown = false,
    ...props
}: InputProps & { errorMessage?: string | null; isErrorShown?: boolean }) => {
    return (
        <div className="grid gap-2">
            <NormalInput label={label} type={type} name={name} placeholder={placeholder} {...props} />
            <ErrorMessage text={errorMessage || ''} hidden={!isErrorShown} size="small" />
        </div>
    );
};

interface SubmitProps extends ButtonProps {
    showSpinner: boolean;
    disabledClick: () => void;
    isSubmitting: boolean;
}

const Submit = ({ disabled, showSpinner, disabledClick, isSubmitting }: SubmitProps) => {
    return (
        <div className="relative">
            <div className={`absolute z-10 w-full h-full ${!disabled ? 'hidden' : ''}`} onClick={disabledClick}></div>
            <Button
                className="w-full py-2 transition-all duration-200 transform hover:bg-primary-dark disabled:opacity-50 "
                disabled={disabled}
            >
                <Spinner showSpinner={showSpinner} />
                <span className={clsx(isSubmitting && 'invisible')}>Log in</span>
            </Button>
        </div>
    );
};
const Form = ({ handleSubmit, children }: FormProps) => {
    return (
        <form onSubmit={handleSubmit} className="grid gap-6">
            <FormInputs>{children}</FormInputs>
        </form>
    );
};

const Divider = ({ ...props }: Partial<React.ComponentProps<typeof KremeDivider>>) => {
    return (
        <div className="pb-4 font-medium pt-7">
            <KremeDivider text="OR" lineColor="rgba(0,0,0,.2)" textColor="rgba(0,0,0,.4)" {...props} />
        </div>
    );
};

interface AuthLayoutProps {
    title?: string;
    subtitle?: string;
    children: React.ReactNode;
}

const AuthLayout = ({ title, subtitle, children }: AuthLayoutProps) => {
    return (
        <Wrapper>
            <div className="py-5">
                <h1 className="pb-1 text-3xl font-bold ">{title}</h1>
                <p className="text-sm text-gray-500 ">{subtitle}</p>
            </div>

            <div className="pt-5 text-sm">{children}</div>
        </Wrapper>
    );
};

export default Object.assign(AuthLayout, { SocialButton, Form, FormInputs, Input, Submit, Divider });
