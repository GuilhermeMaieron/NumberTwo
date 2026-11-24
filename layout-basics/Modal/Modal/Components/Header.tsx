import { Source_Sans_3 } from 'next/font/google';
import { ReactNode } from 'react';
import styles from './Root.module.scss';
import { DefaultBotao } from '../../../Botao/DefaultBotao/DefaultBotao';

type HeaderProps = {
    children?: ReactNode;
    titulo?: ReactNode;
};

const sansPro = Source_Sans_3({ weight: '500', subsets: ['latin'] });

export function Header({ children, titulo }: HeaderProps) {
    return (
        <div>
            {children ? (
                children
            ) : (
                <div className={`modal-header ${styles.header}`}>
                    <h5 className={`${sansPro.className} modal-title`}>
                        {titulo}
                    </h5>
                    <DefaultBotao type='button'
                        neutral
                        classExtra='px-2 py-1 butao-close'
                        databsdismiss='modal'
                        aria-label='Fechar'>
                            <i className="bi bi-x-lg"></i>
                    </DefaultBotao>
                </div>
            )}
        </div>
    );
}
