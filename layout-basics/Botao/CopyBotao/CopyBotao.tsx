import { DefaultBotao } from "../DefaultBotao/DefaultBotao";

type CopyBotaoProps = {
    data: any,
    texto?: string,
    copyMsg?: string,
    classExtra?: string,
    neutral?: boolean,
    customIcon?: string
}

export function CopyBotao(props: CopyBotaoProps) {
    function copyToClipboard() {
        const el = document.createElement('textarea');
        el.value = props.data;
        document.body.appendChild(el);
        el.select();
        el.setSelectionRange(0, 99999); // For mobile devices
        navigator.clipboard.writeText(el.value);
        document.execCommand('copy');
        document.body.removeChild(el);
        
        window.alert(props.copyMsg ? props.copyMsg : "Copiado(s)!")
    };

    return (
        <DefaultBotao onClickFunc={copyToClipboard} classExtra={`gap-2 ${props.classExtra}`} neutral={props.neutral}>
            <i className={props.customIcon ? props.customIcon : 'bi bi-clipboard'}></i> {props.texto}
        </DefaultBotao>
    );
}
