import styles from './DefaultBusca.module.scss';

type DefaultBuscaProps = {
    placeholder?: string,
    name? : string,
    layout_classes?: string,
    onChange?: Function,
    defaultValue?: string
}


export function DefaultBusca(props: DefaultBuscaProps) {

    return (
        <div className={`w-100 d-flex justify-content-center h-100 ${props.layout_classes}`}>
            <div className={`rounded-pill ${styles.busca_layout}`}>
                <div className={`rounded-pill ${styles.input_gp}`}>

                    <input type="search"
                        defaultValue={props.defaultValue}
                        onChange={props.onChange as any}
                        placeholder={`${props.placeholder ? props.placeholder : 'Pesquisar'}`}
                        className={`form-control rounded-pill ${styles.input_busca}`}
                        name={`${props.name ? props.name : 'qs'}`}/>

                    <div className={styles.botao_layout}>
                        <button className={`btn ${styles.btn_busca}`} type="submit">
                            <i className="bi bi-search"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
