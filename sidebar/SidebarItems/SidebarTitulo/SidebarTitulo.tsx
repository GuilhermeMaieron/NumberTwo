"use client"
import styles from './SidebarTitulo.module.scss';
import { SidebarContext } from "../../Sidebar/context/SidebarContext";
import { useContext } from "react";

type SidebarTituloProps = {
    classes_extra?: string,
    texto: string
}

export function SidebarTitulo(props: SidebarTituloProps) {
    const sidebarContext = useContext(SidebarContext);

    let expanded = sidebarContext.expanded;
    
    return (
        <div className={`${styles.titulo_layout} ${expanded? styles.expanded : ''} ${props.classes_extra}`}>
            {props.texto}
        </div>
    );
}
