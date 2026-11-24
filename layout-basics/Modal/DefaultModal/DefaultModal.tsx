'use client';
import { Source_Sans_3 } from 'next/font/google';
import { ReactElement, useEffect, useId } from 'react';
import { DefaultBotao } from '../../Botao/DefaultBotao/DefaultBotao';
import styles from './DefaultModal.module.scss';


const sansPro = Source_Sans_3({ weight: '500', subsets: ['latin'] });

type DefaultModalProps = {
    children: ReactElement | ReactElement[],
    titulo?: ReactElement | ReactElement[] | string,
    id?: string,
    classExtra?: string,
    funcao_abrir_modal?: any,
    fillHeight?: boolean,
    fullScreen?: boolean,
    funcao_fechar_modal?: any,
    classBody?: string,
    databsbackdrop?: string,
    databskeyboard?: string,
    defaultShow?: boolean,
    header?: ReactElement | ReactElement[] | string,
    footer?: ReactElement | ReactElement[] | string,
    centered?: boolean,
}

/**
 * @deprecated
 *
 * Usar o componente Modal do koakuma no lugar
 */
export function DefaultModal(props: DefaultModalProps) {
    const id = props.id ? props.id : useId();

    useEffect(() => {
        if (props.funcao_abrir_modal) {
            document.getElementById(id)?.addEventListener('shown.bs.modal', (event: Event) => {
                props.funcao_abrir_modal(event);
            });
        }

        if (props.funcao_fechar_modal) {
            document.getElementById(id)?.addEventListener('hidden.bs.modal', (event: Event) => {
                props.funcao_fechar_modal(event);
            });
        }
    }, [props]);

    useEffect(() => {
        if (props.defaultShow) { document.getElementById(`open_${props.id}`)?.click(); }
    }, []);


    return (
        <div className={`modal fade ${styles.no_ov}`} id={id} data-bs-backdrop={props.databsbackdrop} data-bs-keyboard={props.databskeyboard}>
            <div className={`modal-dialog modal-dialog-scrollable 
            ${props.classExtra} ${props.centered && 'modal-dialog-centered'}
            ${props.fullScreen ? 'modal-fullscreen' : styles.mh}`}>
                <div className={`modal-content ${styles.modal_border}`}>
                    {props.header ? (
                        props.header
                    ) : (
                        <div className={`modal-header ${styles.header}`}>
                            <h5 className={`${sansPro.className} modal-title`}>
                                {props.titulo}
                            </h5>
                            <button type="button" className="butao-close btn-close" data-bs-dismiss="modal" aria-label="Fechar"/>
                        </div>
                    )}

                    <div className={`modal-body p-2 p-md-3 pt-2 ${styles.body} ${props.classBody} ${props.fillHeight ? styles.fillH : ''}`}>
                        {props.children}
                    </div>

                    {props.footer ? (
                        <div className={'modal-footer'}>
                            {props.footer}
                        </div>
                    ) : ''}
                </div>
            </div>

            <div className='opacity-0 position-absolute'>
                <DefaultBotao databstarget={`#${props.id}`} databstoggle='modal' type='button' id={`open_${props.id}`}>
                    <></>
                </DefaultBotao>
            </div>
        </div>
    );
}

