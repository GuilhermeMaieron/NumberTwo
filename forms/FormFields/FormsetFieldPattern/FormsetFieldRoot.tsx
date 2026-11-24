import { ReactNode, useId, useState } from 'react';

import { APIFormError, APIFormFieldError, FormField, FormsetField } from 'root/NumberTwo/@types/forms';
import { ErrorMessage } from '../FieldError/ErrorMessage';
import styles from './FormsetField.module.scss';
import { FormsetContext } from './context/FormsetContext';

interface FormsetFieldRootProps {
    children: ReactNode,
    data: FormsetField,
    erros: APIFormError[]
    non_field_errors?: APIFormFieldError[]
}

type FormSet = {
  [id: string]: FormField[]
}

export function FormsetFieldRoot({ children, data, erros = [], ...props } : FormsetFieldRootProps) {
    const id = useId();
    const [count, setCount] = useState(data.value.length);
    const [formSet, setformSet] = useState<FormSet>(
        listaParaDicionario(data.value),
    );
    return (
        <FormsetContext.Provider value={{ data, id, count, erros, setCount, setformSet, formSet }}>
            <div className={`${styles.formset}`}>
                {children}
                <ErrorMessage errors={props.non_field_errors}/>
            </div>
        </FormsetContext.Provider>
    );
}

function listaParaDicionario(arr: FormField[][]) {
    const dicionario = arr.reduce((dict: FormSet, valor, indice) => {
        dict[indice] = valor;
        return dict;
    }, {});

    return dicionario;
}
