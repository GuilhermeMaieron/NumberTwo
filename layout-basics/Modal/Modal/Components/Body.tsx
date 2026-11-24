import { ReactNode } from 'react';
import styles from './Root.module.scss';

type BodyProps = {
    children?: ReactNode,
    classExtra?: string,
    fillHeight?: boolean,
    id?: string
}

export function Body({ children, classExtra, fillHeight, id }: BodyProps) {
    return (
        <div className={`modal-body ${styles.body} ${classExtra} ${fillHeight ? styles.fillH : ''}`} id={id}>
            {children}
        </div>
    );
}
