import { APIFormFieldError } from 'root/NumberTwo/@types/forms/errors';
import { CheckboxFieldType } from 'root/NumberTwo/@types/forms/fields';
import { FieldError } from '../FieldError/FieldError';
import { FieldLabel } from '../FieldLabel/FieldLabel';
import styles from './CheckboxField.module.scss';

type CheckboxFieldProps = {
    data: CheckboxFieldType,
    invalid?: boolean,
    erros?: APIFormFieldError[],
    className?: string
    onChange?: (value: boolean) => void
}

export const CheckboxField = ({ data, invalid, erros, className, ...props }: CheckboxFieldProps) => {
    const defaultChecked = data.value === null ? (!!data.initial) : data.value;

    return (
        <div className={`position-relative ${styles.div} ${className}`}>
            <div className={`form-check form-switch p-0 ${styles.checkbox_field} gap-2 p-0`}>
                <FieldLabel forId={`id_${data.name}`} required={data.required}>
                    {data.label}
                </FieldLabel>
                <input className={`form-check-input m-0 mt-1 ${invalid ? 'is-invalid' : ''}`}
                    type="checkbox"
                    name={data.name}
                    readOnly={data.disabled}
                    disabled={data.disabled}
                    defaultChecked={defaultChecked}
                    id={`id_${data.name}`}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        if (props.onChange) { props.onChange(event.target.checked); }
                    }}
                />
            </div>

            {erros ? (<FieldError erros={erros}/>) : ''}
        </div>
    );
};
