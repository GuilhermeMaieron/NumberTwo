'use client';
import { ReactNode, useEffect, useState } from 'react';
import { CollapseContext } from '../context';
import styles from './Root.module.scss';
import { DefaultBotao } from '../../Botao/DefaultBotao/DefaultBotao';

type RootProps = {
    children: ReactNode,
    id: string,
    classExtra?: string,
    openDefault?: boolean
    openCollapseFunction?: (e: Event) => void,
    closeCollapseFunction?: (e: Event) => void,
    // databsbackdrop?: string,
    // databskeyboard?: string,
    // titulo?: string,
    // fullScreen?: boolean
}

export function Root({ children, ...props }: RootProps) {
    const [isOpen, setIsOpen] = useState(props.openDefault ? props.openDefault : false);

    function toggleCollapse()
    {
        document.getElementById(`open_${props.id}`)?.click();
    }

    // Close/Open collapse functions
    useEffect(() => {
        document.getElementById(props.id)?.addEventListener('shown.bs.collapse', (event: Event) => {
            if (props.openCollapseFunction) props.openCollapseFunction?.(event);

            setIsOpen(true);
        });

        document.getElementById(props.id)?.addEventListener('hidden.bs.collapse', (event: Event) => {
            if (props.closeCollapseFunction) props.closeCollapseFunction?.(event);
            
            setIsOpen(false);
        });
    }, [props]);

    // openDefault
    useEffect(() => {
        if (props.openDefault) { toggleCollapse() }
    }, []);

    return (
        <CollapseContext.Provider value={{ id: props.id, isOpen: isOpen }}>
            { children }

            <div className='opacity-0 position-absolute'>
                <DefaultBotao databstarget={`#${props.id}`} databstoggle='collapse' type='button' id={`open_${props.id}`}>
                    <></>
                </DefaultBotao>
            </div>
        </CollapseContext.Provider>
    );
}
