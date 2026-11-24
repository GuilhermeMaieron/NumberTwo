import styles from './DefaultImagem.module.scss';

type DefaultImagemProps = {
    imgSrc: string,
    coverFull?: boolean,
    classExtra?: string
}

export function DefaultImagem({ imgSrc, classExtra, coverFull }: DefaultImagemProps) {

    return (
        <div className={`${styles.imagem_capa_layout} ${classExtra}`}>
            <img src={`${imgSrc}`} className={`${styles.imagem_capa_botao} ${coverFull ? styles.coverFull : ''}`}/>

            {coverFull ? '' : (
                <img src={`${imgSrc}`} className={styles.imagem_capa_bg}/>
            )}
        </div>
    );
}
