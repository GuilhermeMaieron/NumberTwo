"use client"
import { ReactNode, useContext } from 'react';
import styles from './Root.module.scss';
import { CollapseContext } from '../context';

type ControllerProps = {
    children?: ReactNode,
    classExtra?: string,
    noSelectDark?: boolean
}

export function Controller({ children, classExtra, noSelectDark }: ControllerProps) {
    const { id, isOpen } = useContext(CollapseContext);

    function toggleCollapse()
    {
        document.getElementById(`open_${id}`)?.click();
    }

    return (
        <div className={`${styles.controller} ${classExtra}`} onClick={toggleCollapse}>
            {children}

            {noSelectDark ? '' : (
                <div className={`${styles.controller_active_div}  ${isOpen ? styles.is_open : ''}`}/>
            )}
        </div>
    );
}
