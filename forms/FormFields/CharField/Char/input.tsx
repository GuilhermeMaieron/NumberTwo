import { useContext, useEffect, useState } from 'react';
import { FormContext } from '../..';
import styles from '../CharField.module.scss';

type InputProps = {
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    type?: string;
    placeholder?: string;
    className?: string;
    style?: React.CSSProperties;
};

export function Input({ onChange, type, ...props }: InputProps) {
    const { data, errors, setErrors } = useContext(FormContext);
    const invalid = !!errors;
    const [value, setValue] = useState(data.value ? data.value : data.initial);

    useEffect(() => {
        setValue(data.value ? data.value : data.initial);
    }, [data.value, data.initial]);

    return (
        <>
            <input
                type={type ? type : 'text'}
                value={value ?? ''}
                className={`${styles.char_input} ${invalid ? 'is-invalid' : ''} ${props.className}`}
                id={`id_${data.name}`}
                name={data.name}
                readOnly={data.disabled}
                disabled={data.disabled}
                maxLength={data.max_length}
                minLength={data.min_length}
                required={!!data.required}
                style={props.style}
                onChange={(event) => {
                    setErrors?.(undefined);
                    onChange?.(event);
                    setValue(event.target.value);
                }}
                placeholder={props.placeholder || data.placeholder}
            />
        </>
    );
}
