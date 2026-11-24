'use client'
// eslint-disable-next-line camelcase
import { BaseBotao } from './BaseBotao/BaseBotao';
import styles from './SidebarBotao.module.scss'

type ConteudoBotao = {
    icone: string,
    texto: string
    url?: string,
    url_api_atual?: string,
    func_onclick?: any,
    disabled?: boolean,
}

export function SidebarApiBotao(props: ConteudoBotao) {
    let selected = false;

    if (props.url_api_atual && props.url_api_atual === props.url) selected = true;

    return (
        <a className={`p-0 d-block text-decoration-none ${props.disabled ? styles.disabled : ''}`} 
           onClick={props.func_onclick} 
           id={props.url}>
            <BaseBotao icone={props.icone}
                texto={props.texto}
                selected={selected}>
            </BaseBotao>
        </a>
    );
}
