import { useContext } from 'react';
import { FormContext } from '../..';
import styles from '../NumberField.module.scss';


type InputCommaProps = {
    onChange?: (value: number) => void,
    placeholder?: string,
}

export function InputComma({ onChange, ...props }: InputCommaProps) {
    const { data, errors, setErrors } = useContext(FormContext);
    const invalid = !!errors;

    return (
        <>
            <input type="text"
                className={`form-control ${styles.number_field} ${invalid ? 'is-invalid' : ''}`}
                id={`id_${data.name}`}
                step='any'
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    if (setErrors) {
                        setErrors(undefined);
                    }

                    const cleanedValue = event.target.value.replace('.', ','); // Substitui ponto por vírgula
                    const formattedValue = cleanedValue.replace(/[^\d,]/g, ''); // Remove caracteres não numéricos, exceto vírgula
                    event.target.value = formattedValue;

                    if (onChange) {
                        onChange(parseFloat(formattedValue.replace(',', '.')));
                    }
                }}
                pattern={data.pattern}
                readOnly={data.disabled}
                disabled={data.disabled}
                defaultValue={data.value ? data.value.toString().replace('.', ',') : data.initial}
                required={!!data.required}
                placeholder={data.placeholder}
                {...props}
            />

            <input type="hidden"
                name={data.name}
                readOnly={data.disabled}
                disabled={data.disabled}
                defaultValue={data.value ? data.value : data.initial}
                required={!!data.required}
            />
        </>
    );
}
