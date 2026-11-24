"use client"
import { CookieManager } from '../.';
import styles from './ThemeFloatButton.module.scss';
import { toggleTema } from '../.';
import { useEffect, useState } from 'react';

type ThemeFloatButtonProps = {
    expanded? : boolean
}

type HtmlTarget = {
    checked? : boolean
}

export function ThemeFloatButton(props: ThemeFloatButtonProps) {
    const [checked, setChecked] = useState(false);

    useEffect(()=>{
        setChecked(CookieManager.getCookie('theme') == "dark");
    }, []);
    
    return (
        <>
            <div className={`${styles.theme_float_button_layout}`}>
                <input className={`btn-check ${styles.float_theme_toggle}`}
                    type="checkbox" 
                    checked={!checked} 
                    role="switch" 
                    id="themeFloatButton"
                    onChange={() => {}}/>
                
                <label className={`${styles.ft_label} shadow-sm`} htmlFor='themeFloatButton' onClick={() => {toggleTema(setChecked)}}>
                    <div className={`${styles.dark_mode} ${styles.theme_md}`}>
                        <i className={`bi bi-moon-stars-fill ${styles.icone_btn}`}/>
                    </div>

                    <div className={`${styles.light_mode} ${styles.theme_md}`}>
                        <i className={`bi bi-brightness-high-fill ${styles.icone_btn}`}/>
                    </div>
                </label>
            </div>
        </>
    );
}
