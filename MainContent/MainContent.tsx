import { ReactNode } from "react";
import styles from './MainContent.module.scss';

type MainContent = {
    children: ReactNode,
    className?: string
}

export function MainContent(props: MainContent) {
    return (
        <main className={`${styles.main_content} ${props.className ? props.className : ""}`}>
            <div className={`${styles.content_div}`}>
                {props.children ? props.children : ""}
            </div>
        </main>
    );
}
