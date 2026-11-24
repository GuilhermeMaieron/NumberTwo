// eslint-disable-next-line camelcase
"use client"
import styles from './SidebarSelect.module.scss';
import { SidebarContext } from "../../Sidebar/context/SidebarContext";
import { useContext } from "react";

type SidebarSelectProps = {
    func_onchange?: Function,
    name?: string,
    id?: string,
    opcoes: any,
    includeTodos?: boolean
}

export function SidebarSelect(props: SidebarSelectProps) {
    const sidebarContext = useContext(SidebarContext);

    let expanded = sidebarContext.expanded;
    
    // EXEMPLO DE ARRAY
    // const options = [
    //     {'value': '0', 
    //      'label': 'Nome (A-Z)'},
    //     {'value': '0', 
    //      'label': 'Nome (A-Z)'},
    //     {'value': '0', 
    //      'label': 'Nome (A-Z)'},
    //     {'value': '0', 
    //      'label': 'Nome (A-Z)'},
    // ]

    return (
        <>
        <div className="p-2 w-100 {">
            <select name={`${props.name ? props.name : 'sidebar_select'}`} 
                    id={`${props.id ? props.id : 'sidebar_select_id'}`} 
                    className={`form-select p-2 ${styles.order_layout} ${expanded ? styles.expanded : ''}`} 
                    onChange={props.func_onchange as any}
                    >
                {props.includeTodos ? (
                    <option value=''>Todos</option>
                ) : ''}
                
                {props.opcoes.map((opcao: any) => {
                    return(
                        <option key={opcao.value} value={opcao.value}>{opcao.label}</option>
                    )})}
            </select>
        </div>
        </>
    );
}
