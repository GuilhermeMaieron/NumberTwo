'use client';
import { Url } from 'next/dist/shared/lib/router/router';
import { Source_Sans_3 as SourceSans3 } from 'next/font/google';
import Link from 'next/link';
import { MouseEventHandler, ReactNode } from 'react';
import styles from './DefaultBotao.module.scss';

type DefaultBotaoProps = {
    children?: ReactNode;
    href?: Url;
    type?: 'button' | 'submit' | 'reset';
    target?: string;
    onClickFunc?: (event?: Event) => void;
    databstoggle?: string;
    databstarget?: string;
    databsdismiss?: string;
    confirmClick?: boolean;
    confirmTexto?: string;
    classExtra?: string;
    danger?: boolean;
    dangerReverse?: boolean;
    value?: string;
    name?: string;
    id?: string;
    neutral?: boolean;
    disableHoverTransform?: boolean;
    layout_classes?: string;
    ariaControls?: string;
    disabled?: boolean;
    extraParams?: { [key: string]: unknown };
};

const sansPro = SourceSans3({ weight: '600', subsets: ['latin'] });

export const DefaultBotao = (props: DefaultBotaoProps) => {
    let className = `${styles.button} ${props.disableHoverTransform ? styles.disabletransform : ''} w-100 ${props.classExtra} ${sansPro.className} ${props.disabled ? 'disabled' : ''}`;

    className += props.neutral ? ` ${styles.neutral}` : '';
    className += props.danger ? ` ${styles.danger}` : '';
    className += props.dangerReverse ? ` ${styles.dangerReverse}` : '';

    function confirm(event: Event) {
        if (
            props.confirmClick &&
            !(
                // eslint-disable-next-line no-alert
                window.confirm(props.confirmTexto ? props.confirmTexto : 'Tem certeza?')
            )
        ) {
            event.preventDefault();
            return;
        }

        if (props.onClickFunc) {
            event.preventDefault();
            props.onClickFunc();
        }
    }

    return (
        <div className={props?.layout_classes}>
            {props.href ? (
                <Link
                    className={className}
                    aria-controls={props?.ariaControls}
                    href={props.href}
                    onClick={
                        ((event: Event) => {
                            confirm(event);
                        }) as unknown as MouseEventHandler
                    }
                    target={props.target}
                    data-bs-target={props.databstarget}
                    data-bs-toggle={props.databstoggle}
                    data-bs-dismiss={props.databsdismiss}
                    id={props.id}
                    {...props.extraParams}
                >
                    {props.children}
                </Link>
            ) : (
                <button
                    className={className}
                    type={props?.type}
                    aria-controls={props?.ariaControls}
                    onClick={
                        ((event: Event) => {
                            confirm(event);
                        }) as unknown as MouseEventHandler
                    }
                    data-bs-target={props.databstarget}
                    data-bs-toggle={props.databstoggle}
                    data-bs-dismiss={props.databsdismiss}
                    value={props.value}
                    name={props.name}
                    id={props.id}
                    disabled={props.disabled}
                    {...props.extraParams}
                >
                    {props.children}
                </button>
            )}
        </div>
    );
};
