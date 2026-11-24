import { ReactNode } from 'react';
import styles from './Root.module.scss';

type FooterProps = {
    children?: ReactNode
}

export function Footer({ children }: FooterProps) {
    return (
        <div className={`modal-footer ${styles.footer_modal}`}>
            {children}
        </div>
    );
}
