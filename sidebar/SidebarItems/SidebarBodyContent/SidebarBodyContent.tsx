import { ReactNode } from 'react';
import styles from '../../Sidebar/Sidebar.module.scss';

type BodyContent = {
    children: ReactNode
}

export function SidebarBodyContent(props: BodyContent) {
    return (
        <div id="nav_body" className={`${styles.margem_minuscula} ${styles.mid_content}`}>
            {props.children}
        </div>
    );
}
