import { Source_Sans_3 } from 'next/font/google';
import styles from './DefaultCard.module.scss';


const sansPro = Source_Sans_3({ weight: '700', subsets: ['latin'] });

type DefaultCardProps = {
    children: React.ReactNode,
    titulo?: string,
    label?: string
    classExtra?: string,
}

export const DefaultCard = ({ children, label, titulo, classExtra }: DefaultCardProps) => (
    <div className="w-100 h-100">
        { label ?
            <div className={`${styles.label} ${sansPro.className}`}>
                { label }
            </div> :
            '' }

        <div className={`${styles.card} ${classExtra}`}>
            {titulo ? (
                <div className={`${styles.titulo_card} ${sansPro.className}`}>
                    {titulo}
                </div>
            ) : ''}

            { children }
        </div>
    </div>
);
