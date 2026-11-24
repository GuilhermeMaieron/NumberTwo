import { Source_Sans_3 } from 'next/font/google';
import { ReactNode, useContext } from 'react';
import { FormContext } from '..';
import styles from './FieldLabel.module.scss';

export type LabelProps = {
    children?: ReactNode,
    className?: string
}

const sansPro = Source_Sans_3({ weight: '300', subsets: ['latin'] });
const sansProBold = Source_Sans_3({ weight: '700', subsets: ['latin'] });

/**
 * Este componente foi projetado para ser usado dentro de um
 * dos vários componentes de campo de formulário.
 */
export function ContextLabel({ children, className }: LabelProps) {
    const { data } = useContext(FormContext);
    const forId = `id_${data?.name}`;
    const required = data?.required;

    return (
        <label
            htmlFor={forId}
            className={`form-label ${sansPro.className} ${styles.label} mb-0 d-flex ${className}`}>
            {children ? children : data?.label}
            {required ? (
                <div className={`${sansProBold.className} ${styles.asterisco}`}>*</div>
            ) : ''}
        </label>
    );
}
