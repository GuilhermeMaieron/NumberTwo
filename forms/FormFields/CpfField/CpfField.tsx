import { FieldError } from '../FieldError/FieldError'
import { FieldLabel } from '../FieldLabel/FieldLabel'
import styles from './CharField.module.scss'

type CpfFieldProps = {
    data: any,
    invalid?: boolean,
    erros?: any
}

export const CpfField = ({ data, invalid, erros }: CpfFieldProps) => {    
    return (
        <div className="position-relative">
            <FieldLabel forId={`id_${data.name}`} required={data.required}>
                {data.label}
            </FieldLabel>

            <input type="text"
                defaultValue={data.value ? data.value : data.initial}
                className={`form-control ${styles.char_input} ${invalid ? 'is-invalid' : ''}`} 
                id={`id_${data.name}`}
                name={data.name}
                readOnly={data.disabled}
                disabled={data.disabled}
                maxLength={data.max_length}
                style={{
                    width: `${data.max_length / 1.25}rem`
                    }}
                minLength={data.min_length}
                required={data.required ? true : false}
                placeholder={data.placeholder}/>

            {erros? ( <FieldError erros={erros}/> ) : ''}
        </div>
    )
}
