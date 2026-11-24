import { Source_Sans_3 } from 'next/font/google';
import { ReactNode } from 'react';
import styles from './FieldLabel.module.scss';

type FieldLabelProps = {
    forId?: string,
    children?: ReactNode,
    required?: boolean,
    extra_classes?: string
}

const sansPro = Source_Sans_3({ weight: '300', subsets: ['latin'] });
const sansProBold = Source_Sans_3({ weight: '700', subsets: ['latin'] });

export const FieldLabel = ({ forId, children, required, extra_classes }: FieldLabelProps) => (
    <label htmlFor={forId} className={`form-label ${sansPro.className} ${styles.label} mb-0 d-flex ${extra_classes}`}>
        {children}{required ? (<div className={`${sansProBold.className} ${styles.asterisco}`}>*</div>) : ''}
    </label>
);
