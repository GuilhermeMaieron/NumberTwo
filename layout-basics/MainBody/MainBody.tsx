// eslint-disable-next-line camelcase
import { ReactNode } from 'react';
import styles from './MainBody.module.scss';

type ConteudoBody = {
    children: ReactNode,
    classes_extra?: string
}


export function MainBody(props: ConteudoBody) {
    return (
        <div className={`${styles.body_style} ${props.classes_extra}`}>
            <div className={`${styles.content_style} ${styles.cor_borda} rounded`}>
                {props.children}
            </div>
        </div>
    );
}
