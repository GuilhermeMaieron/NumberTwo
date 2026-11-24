// eslint-disable-next-line camelcase
'use client'
import { ReactElement, useEffect, useState } from 'react';
import { SidebarHeader } from '../SidebarItems/SidebarHeader/SidebarHeader';
import styles from './Sidebar.module.scss';
import { SidebarContext } from "./context/SidebarContext";

type ConteudoSidebar = {
    children: ReactElement[] | ReactElement,
    titulo: string,
    metodo_form?: string,
    func_submit?: () => void,
    href?: string,
    defaultClosed?: boolean
}


export function Sidebar(props: ConteudoSidebar) {
    const [expanded, setExpanded] = useState((props.defaultClosed ? false : true));

    function HandleToggleExpand() {
        setExpanded(!!!expanded);
    }
    
    // ESSAS 2 FUNÇÃO SÃO PRA FUNCIONAR A ALTURA NO MOBILE
    function windowResize() {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    useEffect(() => {
        const nav = document.getElementById("sidebar_id");
        if (nav)
        {      
            if (window.innerWidth < 768)
            {
                setExpanded(false);
            }

            const btns = nav.querySelectorAll('a');
            btns.forEach((btn) => {
                if (!btn) { return; }
    
                btn.addEventListener('click', () => {
                    if (window.innerWidth < 768)
                    {
                        setExpanded(false);
                    }
                })
            });

            const expand_btns = nav.querySelectorAll('.expand_nav');
            expand_btns.forEach((btn) => {
                if (!btn) { return; }
    
                btn.addEventListener('click', () => {
                    if (window.innerWidth >= 768)
                    {
                        setExpanded(true);
                    }
                })
            });
        }
        windowResize();
        window.addEventListener('resize', () => { windowResize(); });
    }, []);
    
    return (<>
        <div id={`sidebar_id`} className={`${styles.main_sidebar} ${expanded ? (`${styles.expand}`) : ''} ${styles.cor_borda} shadow-sm border-end`}>
            <SidebarContext.Provider value={{ expanded }}>
                <SidebarHeader titulo={props.titulo} HandleToggleExpand={HandleToggleExpand} href={props.href}/>
                
                <form id="sidebar_form" method={props.metodo_form} onSubmit={props.func_submit}>
                    <div id="conteudo_sidebar_id" className={`${styles.conteudo_sidebar}`}>
                        <div className='div_barrinha'/>

                        {props.children}
                    </div>
                </form>
            </SidebarContext.Provider>
        </div>
    </>);
}
