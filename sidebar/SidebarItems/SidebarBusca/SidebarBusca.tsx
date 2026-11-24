import styles from './SidebarBusca.module.scss';
import { SidebarContext } from "../../Sidebar/context/SidebarContext";
import { useContext } from "react";

type SidebarProps = {
    placeholder?: string,
    name? : string
}

export function SidebarBusca(props: SidebarProps) {
    const sidebarContext = useContext(SidebarContext);

    let expanded = sidebarContext.expanded;

    return (
        <div className='p-2 w-100'>
            <div className={`rounded-pill ${styles.busca_layout} ${expanded ? styles.expanded : ''}`}>
                <div className={`rounded-pill ${styles.input_gp}`}>

                    <input type="search"
                        placeholder={`${props.placeholder ? props.placeholder : 'Pesquisar'}`}
                        className={`form-control rounded-pill ${styles.input_busca}`}
                        name={`${props.name ? props.name : 'qs'}`}/>

                    <div className={styles.botao_layout}>
                        <button className={`btn ${styles.btn_busca_exp}`} type="submit">
                            <i className="bi bi-search fs-5"></i>
                        </button>

                        <a className={`btn expand_nav ${styles.btn_busca_min}`}>
                            <i className="bi bi-search fs-5"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
