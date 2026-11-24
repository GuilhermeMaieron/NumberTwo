import { useContext } from 'react';
import { FormContext } from '../..';
import styles from '../NumberField.module.scss';


type InputProps = {
    onChange?: (value: number) => void,
    placeholder?: string,
}

export function Input({ onChange, ...props }: InputProps) {
    const { data, errors, setErrors } = useContext(FormContext);
    const invalid = !!errors;

    return (
        <input type="number"
            className={`form-control ${styles.number_field} ${invalid ? 'is-invalid' : ''}`}
            id={`id_${data.name}`}
            name={data.name}
            step='any'
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                if (setErrors) { setErrors(undefined); }
                if (onChange) { onChange(parseFloat(event.target.value)); }
            }}
            pattern={data.pattern}
            readOnly={data.disabled}
            disabled={data.disabled}
            defaultValue={data.value ? data.value : data.initial}
            required={!!data.required}
            placeholder={data.placeholder}
            {...props}
        />
    );
}
