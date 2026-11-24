import { FieldError } from '../FieldError/FieldError';
import { FieldLabel } from '../FieldLabel/FieldLabel';
import styles from './ColorField.module.scss';

type ColorFieldProps = {
    data: any,
    invalid?: boolean,
    erros?: any
}

export const ColorField = ({ data, invalid, erros  }: ColorFieldProps) => {    
    return (
        <div className={`position-relative ${styles.div}`}>
            <FieldLabel forId={`id_${data.name}`} required={data.required}>
                {data.label}
            </FieldLabel>

            <input type="color"
                id={`id_${data.name}`}
                className={`form-control ${styles.color_field} ${invalid ? 'is-invalid' : ''}`}
                name={data.name}
                readOnly={data.disabled}
                disabled={data.disabled}
                defaultValue={data.value ? data.value : data.initial}
                required={!!data.required}
                placeholder={data.placeholder}
                />
        
            {erros? ( <FieldError erros={erros}/> ) : ''}
        </div>
    )
}
