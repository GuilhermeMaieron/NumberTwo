'use client';
import { ReactNode, useEffect, useState } from 'react';
import { Modal } from '..';
import { DefaultBotao } from '../../../Botao/DefaultBotao/DefaultBotao';
import { ModalContext } from '../context';
import styles from './Root.module.scss';

export type ModalRootProps = {
    children?: ReactNode,
    id: string,
    openDefault?: boolean,
    openModalFunction?: (e: Event) => void,
    closeModalFunction?: (e: Event) => void,
    databsbackdrop?: string,
    databskeyboard?: string,
    classExtra?: string,
    titulo?: string,
    fullScreen?: boolean
}

export function Root({ children, ...props }: ModalRootProps) {
    const [openEventListeners, SetOpenEventListeners] = useState<((e: Event) => void)[]>([]);
    const [closeEventListeners, SetCloseEventListeners] = useState<((e: Event) => void)[]>([]);

    function openModal(e: Event)
    {
        props.openModalFunction?.(e);
    }

    function closeModal(e: Event)
    {
        props.closeModalFunction?.(e);
    }

    // Close/Open modal functions
    useEffect(() => {
        openEventListeners.forEach((func: (e: Event) => void) => {
            document.getElementById(props.id)?.removeEventListener('shown.bs.modal', func);
        });

        closeEventListeners.forEach((func: (e: Event) => void) => {
            document.getElementById(props.id)?.removeEventListener('hidden.bs.modal', func);
        });

        setTimeout(() => {
            if (props.openModalFunction) {
                let listeners = openEventListeners;
                listeners.push(openModal);
                SetOpenEventListeners(listeners);
                document.getElementById(props.id)?.addEventListener('shown.bs.modal', openModal);
            }
    
            if (props.closeModalFunction) {
                let listeners = closeEventListeners;
                listeners.push(closeModal);
                SetCloseEventListeners(listeners);
                document.getElementById(props.id)?.addEventListener('hidden.bs.modal', closeModal);
            }
        }, 100);
    }, [props]);

    // openDefault
    useEffect(() => {
        if (props.openDefault) { document.getElementById(`open_${props.id}`)?.click(); }
    }, []);

    return (
        <ModalContext.Provider value={{}}>
            <div className={`modal fade ${styles.no_ov}`}
                id={props.id}
                data-bs-backdrop={props.databsbackdrop}
                data-bs-keyboard={props.databskeyboard}>

                <div className={`modal-dialog modal-dialog-scrollable ${props.classExtra} ${props.fullScreen ? 'modal-fullscreen' : styles.mh}`}>
                    <div className={`modal-content ${styles.modal_border} h-100`}>
                        {props.titulo ? (
                            <Modal.Header titulo={props.titulo}/>
                        ) : ''}

                        { children }
                    </div>
                </div>

                <div className='opacity-0 position-absolute'>
                    <DefaultBotao databstarget={`#${props.id}`} databstoggle='modal' type='button' id={`open_${props.id}`}>
                        <></>
                    </DefaultBotao>
                </div>
            </div>
        </ModalContext.Provider>
    );
}
