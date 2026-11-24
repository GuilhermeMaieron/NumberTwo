'use client';
import { APIFormFieldError } from 'root/NumberTwo/@types/forms';
import { MoneyFieldType } from 'root/NumberTwo/@types/forms/fields';
import { Col } from 'root/NumberTwo/layout-basics';
import { useEffect, useState } from 'react';
import { FieldError } from '../FieldError/FieldError';
import { FieldLabel } from '../FieldLabel/FieldLabel';
import styles from './MoneyField.module.scss';


type MoneyFieldProps = {
    data: MoneyFieldType,
    invalid?: boolean,
    erros?: APIFormFieldError[],
    className?: string
    onchange?: (valor: string) => void
}

/**
 * @deprecated esse componente não é mais utilizado, use o componente
 * [Money]() no lugar.
*/
export const MoneyField = ({ data, invalid, erros, ...props }: MoneyFieldProps) => {
    const [valor, setValor] = useState<string>('');
    const [valorDisplay, setValorDisplay] = useState('');

    const moneyMask = (value: string) => {
        value = value.toString();
        value = value.replace('.', '').replace(',', '').replace(/\D/g, '');
        const options = { currency: 'BRL', minimumFractionDigits: 2 };
        const result = new Intl.NumberFormat('pt-BR', options).format(
            parseFloat(value) / 100,
        );

        const valorHidden = result.replaceAll('.', '').replaceAll(',', '.');

        if (props.onchange) { props.onchange(valorHidden); }
        setValor(valorHidden);
        setValorDisplay(`R$ ${result}`);
    };

    useEffect(() => {
        const theValue = (data.value || data.initial || 0) as string;
        setValor(theValue);
        moneyMask(theValue);
    }, [data.value]);

    return (
        <Col className={`position-relative ${styles.div} ${props.className}`}>
            <FieldLabel forId={`id_${data.name}`} required={data.required}>
                {data.label}
            </FieldLabel>

            <input type="tel"
                className={`form-control ${styles.money_field} ${invalid ? 'is-invalid' : ''}`}
                readOnly={data.disabled}
                disabled={data.disabled}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => { moneyMask(event.target.value); }}
                value={valorDisplay}
                required={!!data.required}
                placeholder={data.placeholder}
            />

            <input type="hidden"
                id={`id_${data.name}`}
                name={data.name}
                readOnly={data.disabled}
                disabled={data.disabled}

                value={valor}
                required={!!data.required}
            />

            {erros ? (<FieldError erros={erros}/>) : ''}
        </Col>
    );
};
