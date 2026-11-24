'use client'
import { useContext, useState } from 'react';
import styles from './SidebarButtonToggle.module.scss';
import { SidebarContext } from "../../Sidebar/context/SidebarContext";

type SidebarButtonToggleProps = {
    texto1?: string,
    icone1: string,
    valor1: string,
    
    icone2: string,
    texto2?: string,
    valor2: string
    
    func_onclick?: any,
}

export function SidebarButtonToggle(props: SidebarButtonToggleProps) {
    const [selectedBtn, setSelectedBtn] = useState("op0")
    const sidebarContext = useContext(SidebarContext);

    let expanded = sidebarContext.expanded;

    function handleChange (event: Event) {
        const botao_click = event.target
        if (!botao_click) { return }
        setSelectedBtn((event.target as any).id)

        if (props.func_onclick) props.func_onclick(event);
    }
    

    return ( 
        <div className={`btn-group w-100 ${styles.botoes_layout} ${expanded ? styles.expanded : ''}`}>

            <input value={props.valor1} 
                defaultChecked 
                type="radio" 
                className={`btn-check selected`} 
                name="listar" 
                id="op0" 
                onChange={handleChange as any}/>

            <label className={`btn ${styles.botao_toggle} ${selectedBtn == "op0" ? styles.active : ''} `}
                htmlFor="op0" data-bs-toggle="tooltip" data-bs-title={props.texto1}>
                <i className={`${props.icone1} ${styles.icone_botao} fs-5`}/>
            </label>
            
            <a href="#" className={`${styles.a_expand} expand_nav `}/>

            <input value={props.valor2} 
                type="radio" 
                className="btn-check" 
                name="listar" 
                id="op1" 
                onChange={handleChange as any}/>

            <label className={`btn ${styles.botao_toggle} ${selectedBtn == "op1" ? styles.active : ''} `}
                htmlFor="op1" data-bs-toggle="tooltip" data-bs-title={props.texto2}>
                <i className={`${props.icone2} ${styles.icone_botao} fs-5`}/>
            </label>
        </div>
    );
}
