'use client';
// eslint-disable-next-line camelcase
import { Url } from 'next/dist/shared/lib/router/router';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { BaseBotao } from './BaseBotao/BaseBotao';
import styles from './SidebarBotao.module.scss';

type ConteudoBotao = {
    icone: string;
    texto: string;
    url?: Url;
    onClick?: () => void,
    databstoggle?: string;
    databstarget?: string;
    disabled?: boolean;
};

export function SidebarLinkBotao(props: ConteudoBotao) {
    const [selected, setSelected] = useState(false);

    useEffect(() => {
        if (
            window.location.host + window.location.pathname ===
            `${window.location.host}${props.url}`
        ) {
            setSelected(true);
        } else {
            setSelected(false);
        }
    }, []);

    return (
        <Link onClick={props.onClick}
            href={`${props.url}`}
            className={`p-0 block text-decoration-none ${props.disabled ? styles.disabled : ''}`}
            data-bs-target={props.databstarget}
            data-bs-toggle={props.databstoggle}
        >
            <BaseBotao icone={props.icone} texto={props.texto} selected={selected}></BaseBotao>
        </Link>
    );
}
