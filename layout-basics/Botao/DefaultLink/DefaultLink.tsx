import { Url } from 'next/dist/shared/lib/router/router';
import { Source_Sans_3 } from 'next/font/google';
import Link from 'next/link';
import { ReactNode } from 'react';
import { Row } from '../../Grid/Grid';
import styles from './DefaultLink.module.scss';

type DefaultLinkProps = {
    children: ReactNode;
    href: Url;
    target?: string;
    onClickFunc?: any;
    classes_extra?: string;
    notTitle?: boolean;
};

const sansPro = Source_Sans_3({ weight: '400', subsets: ['latin'] });

/**
 * @deprecated
 * Usar SimpleButton em vez de DefaultLink ou DefaultButton
 */
export const DefaultLink = (props: DefaultLinkProps) => (
    <Row className={`${props.notTitle ? '' : 'justify-content-center'}`}>
        <Link
            className={`${styles.link} ${props.classes_extra} ${sansPro.className}`}
            href={props.href}
            target={props.target}
            onClick={props.onClickFunc}
        >
            {props.children}
        </Link>
    </Row>
);
