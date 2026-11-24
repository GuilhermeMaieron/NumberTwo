'use client'
import { CookieManager } from 'root/NumberTwo/theme'
import styles from './SidebarThemeToggle.module.scss';
import { useEffect, useState } from "react";

type ConteudoToggle = {
    expanded? : boolean
}

export const toggleTema = (setChecked: any) => {
    let tema = 'light';
    if (CookieManager.getCookie('theme') == "dark") {
        tema = 'light'
        setChecked(false);
    } else {
        tema = 'dark'
        setChecked(true);
    }
    CookieManager.setCookie('theme', tema, 7);

    let html_div = document.getElementById("main_html");
    let old_class = html_div?.getAttribute("class");
    html_div?.classList.replace((old_class ? old_class : ''), tema);
};

export function SidebarThemeToggle(props: ConteudoToggle) {
    const [checked, setChecked] = useState(false);

    useEffect(()=>{
        setChecked(CookieManager.getCookie('theme') == "dark");
    }, []);
    
    return (
        <>
            <div className={`${styles.layout_toggle} ${props.expanded ? styles.expanded : ''}`}>
                <div className={`${styles.icone_div}`}>
                    <i className="bi bi-sun mx-2 icone_toggle_theme"></i>
                </div>
                <div className={`form-check form-switch ${styles.form_div}`}>
                    <input checked={checked} 
                           className={`form-check-input ${styles.input_check}`} 
                           type="checkbox" 
                           role="switch"
                           onChange={() => {}}
                           onClick={() => {toggleTema(setChecked)}}/>
                </div>
                <div className={`${styles.icone_div}`}>
                    <i className="bi bi-moon mx-1 icone_toggle_theme"></i>
                </div>
            </div>
        </>
    );
}
