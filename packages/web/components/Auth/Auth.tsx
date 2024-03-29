import ErrorMessage from '@components/Form/ErrorMessage';
import NormalInput, { InputProps } from '@components/Form/Input';
import React from 'react';
import Button, { ButtonProps } from '@components/Button/Button';
import { Divider as KremeDivider } from 'kreme';
import Spinner from '@components/Spinner/Spinner';
import clsx from 'clsx';
import { checkWordInSentence } from '@lib/checks';

const Wrapper = ({ children }: { children?: React.ReactNode }) => {
    return (
        <div className="flex items-start justify-center min-h-screen sm:bg-gray-50 sm:pt-10 ">
            <div className="p-8 pt-3 w-full sm:w-[460px] bg-white sm:border rounded-md">{children}</div>{' '}
        </div>
    );
};

const SocialButton = ({ Icon, label, onClick }: { Icon?: React.ReactNode; label?: string; onClick: () => void }) => {
    return (
        <button
            type="button"
            className="flex items-center justify-center w-full px-4 py-2 border rounded-sm no-outline"
            onClick={onClick}
        >
            {Icon}
            <span className="mt-[2px] pl-3">{label}</span>
        </button>
    );
};

const FormInputs = ({ children, className }: { children?: React.ReactNode; className?: string }) => {
    return (
        <div className={clsx('grid', { 'gap-8': !checkWordInSentence(className, 'gap') }, className)}>{children}</div>
    );
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
    showSpinner?: boolean;
    disabledClick?: () => void;
    isSubmitting: boolean;
    label: string;
}

const Submit = ({ disabled, showSpinner, disabledClick, isSubmitting, label }: SubmitProps) => {
    return (
        <div className="relative">
            <div
                onKeyPress={(e) => {
                    if (e.key === 'enter') {
                        if (disabledClick) {
                            disabledClick();
                        }
                    }
                }}
                tabIndex={0}
                aria-label="Submit"
                role="button"
                className={`absolute z-10 w-full h-full ${!disabled ? 'hidden' : ''}`}
                onClick={disabledClick}
            ></div>
            <Button
                type="submit"
                className="w-full py-2 transition-all duration-200 transform hover:bg-primary-dark disabled:opacity-50 "
                disabled={disabled}
            >
                <Spinner showSpinner={typeof showSpinner === 'undefined' ? isSubmitting : showSpinner} />
                <span className={clsx(isSubmitting && 'invisible')}>{label}</span>
            </Button>
        </div>
    );
};

interface FormProps {
    handleSubmit: React.FormEventHandler;
    children?: React.ReactNode;
    className?: string;
    inputsClassName?: string;
}
const Form = ({ handleSubmit, children, className, inputsClassName }: FormProps) => {
    return (
        <form onSubmit={handleSubmit} className={clsx('grid', { 'gap-6': !checkWordInSentence(className, 'gap') })}>
            <FormInputs className={inputsClassName}>{children}</FormInputs>
        </form>
    );
};

const Divider = ({
    lineOnly,
    ...props
}: Partial<React.ComponentProps<typeof KremeDivider>> & { lineOnly?: boolean }) => {
    if (lineOnly)
        return (
            <div className="py-6">
                <hr />
            </div>
        );
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
    noTitle?: boolean;
}

const AuthLayout = ({ title, subtitle, children, noTitle }: AuthLayoutProps) => {
    return (
        <Wrapper>
            {noTitle ? null : (
                <div className="py-5">
                    <h1 className="pb-1 text-3xl font-bold ">{title}</h1>
                    <p className="text-sm text-gray-500 ">{subtitle}</p>
                </div>
            )}

            <div className="pt-5 text-sm">{children}</div>
        </Wrapper>
    );
};

export default Object.assign(AuthLayout, { SocialButton, Form, FormInputs, Input, Submit, Divider });
