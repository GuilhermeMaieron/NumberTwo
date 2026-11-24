"use client"
import styles from './SidebarLabel.module.scss';
import { useContext } from "react";
import { SidebarContext } from "../../Sidebar/context/SidebarContext";

type SidebarLabelProps = {
    texto: string
}

export function SidebarLabel(props: SidebarLabelProps) {
    const sidebarContext = useContext(SidebarContext);

    let expanded = sidebarContext.expanded;
    
    return (
        <div className={`${styles.label_layout} px-2 ${expanded ? styles.expanded : ''}`}>
            {props.texto}
        </div>
    );
}
