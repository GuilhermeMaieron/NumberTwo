'use client'
import { ReactElement } from 'react';
import styles from '../../Sidebar/Sidebar.module.scss';

type FooterContent = {
    children: ReactElement[] | ReactElement
}

export function SidebarFooter(props: FooterContent) {
    return (
        <div className={styles.content_footer}>
            <div className='position-absolute w-100 h-100 px-3 div_barrinha pe-none'>
                <div className={`${styles.cor_borda} border-top w-100 h-100`}></div>
            </div>
            { props.children }
        </div>
    );
}
