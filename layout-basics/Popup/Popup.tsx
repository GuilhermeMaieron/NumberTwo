"use client"
import { ReactElement, useEffect, useState } from "react";
import styles from './Popup.module.scss';

type ClickMarkerProps = {
    children: ReactElement | ReactElement[],
    left: any,
    top: any,
    show?: boolean,
    show_hover?: boolean
}

export const Popup = ({left, top, children, show, show_hover}: ClickMarkerProps) => {
    const [showPop, setShowPop] = useState(show);

    useEffect(() => {
        setShowPop(show);
    }, [show]);

    let pos_popup = '';
    if (left <= 50 && top <= 50)
    {
        pos_popup = styles.left_top
    }
    else if (left > 50 && top <= 50)
    {
        pos_popup = styles.right_top
    }
    else if (left <= 50 && top > 50)
    {
        pos_popup = styles.left_bottom
    }
    else if (left > 50 && top > 50)
    {
        pos_popup = styles.right_bottom
    }

    function hovered(over: boolean) {
        if (!show_hover) return;

        over ? setShowPop(true) : setShowPop(false);
    }

    return (
        <div className={`${styles.popup_layout} ${pos_popup} ${showPop ? styles.show : styles.hide}`} 
             style={{transform: `scale(1)`}} onMouseOver={() => {hovered(true)}} onMouseLeave={() => {hovered(false)}}>
            {children}
        </div>
    )
}
