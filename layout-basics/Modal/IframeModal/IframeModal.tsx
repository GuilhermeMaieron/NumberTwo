"use client"
import { useState } from "react";
import styles from './IframeModal.module.scss'
import { Modal } from "../Modal";
import { ModalRootProps } from "../Modal/Components/Root";

type IframeModalProps = ModalRootProps & {
    srcIframe: string,
    notBig?: boolean
}

export const IframeModal = (props: IframeModalProps) => {
    const [urlIframe, setUrlIframe] = useState("");

    return (
        <Modal.Root {...props}
                    classExtra={`${props.classExtra} ${props.notBig ? '' : styles.modalBig}`}
                    openModalFunction={() => {setUrlIframe(props.srcIframe)}}
                    closeModalFunction={() => {setUrlIframe("")}}>
            <Modal.Body classExtra={styles.nop}>
                <iframe src={urlIframe} className={styles.iframeclass}/>
            </Modal.Body>
        </Modal.Root>
    )
}
