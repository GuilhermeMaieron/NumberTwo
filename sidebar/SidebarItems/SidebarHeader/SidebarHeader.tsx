// eslint-disable-next-line camelcase
import { MouseEventHandler } from "react";
import styles from "../../Sidebar/Sidebar.module.scss";
import { SidebarTitulo } from "../SidebarTitulo/SidebarTitulo";

type SideHeaderProps = {
    HandleToggleExpand: void | unknown,
    href?: string,
    titulo: string
}

export function SidebarHeader(props: SideHeaderProps) {
    
    return (
        <div id="cabecalho_sidebar_id" className={`${styles.cabecalho_sidebar} width-100 flex`}>
            <div className={`${styles.titulo_sidebar} w-100`}>
                <SidebarTitulo texto={props.titulo} classes_extra="text-start"/>
            </div>
        
            <div className={`${styles.toggler_div}`}>
                <button className={`${styles.sidebar_toggle_botao}`}
                    id="sidebar_toggle_botao_id"
                    type='button' onClick={props.HandleToggleExpand as MouseEventHandler}>

                    <i className={`${styles.iconezinho} fa-solid fa-bars`}></i>
                </button>
            </div>
        </div>
    );
}
