"use client"
import { ReactNode, useContext } from 'react';
import styles from './Root.module.scss';
import { CollapseContext } from '../context';

type BodyProps = {
    children?: ReactNode,
    classExtra?: string
}

export function Body({ children, classExtra }: BodyProps) {
    const { id } = useContext(CollapseContext);

    return (
        <div className={`${styles.body} ${classExtra} collapse`} id={id}>
            {children}
        </div>
    );
}
