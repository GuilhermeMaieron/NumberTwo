import { useContext, useEffect, useState } from 'react';
import { FormContext } from '../..';
import styles from '../MoneyField.module.scss';

type InputProps = {
    onChange?: (value: string) => void;
    className?: string;
    invalid?: boolean;
};

const DENOMINADOR_DECIMAL = 100;

export default function Input({ onChange, ...props }: InputProps) {
    const { data, errors, setErrors } = useContext(FormContext);
    const [valor, setValor] = useState<string>('');
    const [valorDisplay, setValorDisplay] = useState('');
    const isInvalid = !!errors || props.invalid;

    const moneyMask = (value: string) => {
        let val = value.toString();
        val = val.replace('.', '').replace(',', '').replace(/\D/g, '');
        const result = new Intl.NumberFormat('pt-BR', {
            currency: 'BRL',
            minimumFractionDigits: 2,
        }).format(parseFloat(val) / DENOMINADOR_DECIMAL);

        const valorHidden = result.replaceAll('.', '').replaceAll(',', '.');

        if (onChange) {
            onChange(valorHidden);
        }
        setValor(valorHidden);
        setValorDisplay(`R$ ${result}`);
        if (setErrors) {
            setErrors(undefined);
        }
    };

    useEffect(() => {
        const theValue = (data.value || data.initial || 0) as string;
        setValor(theValue);
        moneyMask(theValue);
    }, [data.value]);

    return (
        <>
            <input
                type='tel'
                className={`form-control ${styles.money_field} ${isInvalid && 'is-invalid'} ${props.className}`}
                readOnly={data.disabled}
                disabled={data.disabled}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    moneyMask(event.target.value);
                }}
                value={valorDisplay}
                required={!!data.required}
                placeholder={data.placeholder}
            />

            <input
                type='hidden'
                id={`id_${data.name}`}
                name={data.name}
                readOnly={data.disabled}
                disabled={data.disabled}
                value={valor}
                required={!!data.required}
            />
        </>
    );
}
