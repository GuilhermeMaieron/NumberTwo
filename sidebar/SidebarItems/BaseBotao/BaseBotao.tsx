// eslint-disable-next-line camelcase
import { ReactNode, useContext } from 'react';
import styles from './BaseBotao.module.scss';
import { SidebarContext } from "../../Sidebar/context/SidebarContext";

type ConteudoAltSidebar = {
    children?: ReactNode,
    icone: string,
    texto: string,
    selected? : boolean
}

export function BaseBotao(props: ConteudoAltSidebar) {
    const sidebarContext = useContext(SidebarContext);

    let expanded = sidebarContext.expanded;

    return (
    <div className={`${styles.botao_layout} ${expanded ? styles.expanded : ''} ${props.selected ? styles.selected : ''}`}>
        <div className={`${styles.style_botao}`}>
            <i className={`${props.icone} ${styles.icone_botao}`}/>

            <div className={`${styles.texto_op_div}`}>
                {props.texto}
            </div>
        </div>
    </div>
    );
}
