import { APIFormFieldError } from 'root/NumberTwo/@types/forms/errors';
import { NumberFieldType } from 'root/NumberTwo/@types/forms/fields';
import { FieldError } from '../FieldError/FieldError';
import { FieldLabel } from '../FieldLabel/FieldLabel';
import styles from './NumberField.module.scss';

type NumberFieldProps = {
    data: NumberFieldType,
    invalid?: boolean,
    className?: string,
    erros?: APIFormFieldError[]
    onChange?: (value: number) => void
}

/**
 * @deprecated esse componente não é mais utilizado, use o componente
 * [NumberField]() no lugar.
 */
export const NumberField = ({ data, invalid, className, erros, ...props }: NumberFieldProps) => (
    <div className={`position-relative ${styles.div} ${className}`}>
        {!!data.label && (
            <FieldLabel forId={`id_${data.name}`} required={data.required}>
                {data.label}
            </FieldLabel>
        )}
        <input type="number"
            className={`form-control ${styles.number_field} ${invalid ? 'is-invalid' : ''}`}
            id={`id_${data.name}`}
            name={data.name}
            step='any'
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                if (props.onChange) {
                    props.onChange(parseFloat(event.currentTarget.value));
                }
            }}
            pattern={data.pattern}
            readOnly={data.disabled}
            disabled={data.disabled}
            defaultValue={data.value ? data.value : data.initial}
            required={!!data.required}
            placeholder={data.placeholder}
        />
        {erros ? <FieldError erros={erros}/> : ''}
    </div>
);
