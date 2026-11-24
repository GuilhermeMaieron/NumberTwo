// eslint-disable-next-line camelcase
import { Source_Sans_3 } from 'next/font/google';
import React from 'react';
import styles from './DefaultTitle.module.scss';
import { NextFont } from 'next/dist/compiled/@next/font';

const sansPro = Source_Sans_3({ weight: '600', subsets: ['latin'] });

type DefaultTitleProps = {
    children?: React.ReactNode,
    texto?: string | React.ReactNode,
    darkText?: boolean,
    danger?: boolean,
    classExtra?: string,
    fonte?: NextFont
}

export function DefaultTitle(props: DefaultTitleProps) {
    const myAttr = { name: 'default_title' };

    let darkText = `${props.darkText ? styles.darkText : ''}`;

    let danger = `${props.danger ? styles.danger : ''}`;

    return (<>
        <div {...myAttr}
            className={`${props.fonte ? props.fonte.className : sansPro.className} ${styles.titulo_layout} ${darkText} ${danger} ${props.classExtra} `}
            id={`id_${props.texto}`}>
            {props.children || props.texto}
        </div>
    </>);
}
