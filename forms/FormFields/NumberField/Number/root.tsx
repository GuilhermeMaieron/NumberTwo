import { APIFormError, APIFormFieldError } from 'root/NumberTwo/@types/forms';
import { MoneyFieldType, NumberFieldType } from 'root/NumberTwo/@types/forms/fields';
import { useEffect, useState } from 'react';
import { FormContext } from '../..';
import { Error, Input, Label } from '../../Field';
import styles from '../NumberField.module.scss';

type RootProps = {
    options: NumberFieldType | MoneyFieldType;
    children: Label | Input | Error;
    // são todos os erros do formulário
    errors?: APIFormError;
    className?: string;
    style?: React.CSSProperties;
};

export function Root({ options, children, ...props }: RootProps) {
    const [errors, setErrors] = useState(
        props.errors?.[options.name] as APIFormFieldError[] | undefined,
    );

    useEffect(() => {
        setErrors(props.errors?.[options.name] as APIFormFieldError[]);
    }, [props.errors, options.name]);

    return (
        <FormContext.Provider value={{ data: options, errors, setErrors }}>
            <div
                className={`position-relative ${styles.div} ${props.className}`}
                style={props.style}
            >
                {children}
            </div>
        </FormContext.Provider>
    );
}
