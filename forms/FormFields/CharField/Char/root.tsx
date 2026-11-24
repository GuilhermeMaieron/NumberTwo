import { APIFormError, APIFormFieldError } from 'root/NumberTwo/@types/forms';
import { CharFieldType } from 'root/NumberTwo/@types/forms/fields';
import { useEffect, useState } from 'react';
import { FormContext } from '../..';
import { Error, Input, Label } from '../../Field';


type RootProps = {
    options: CharFieldType,
    children: Label | Input | Error
    // são todos os erros do formulário
    errors?: APIFormError
    isFormStyle?: boolean
    className?: string
}

const BASIS_COEFICIENT = 1.8;
const GROW_COEFICIENT = 10;

export default function Root({ options, children, ...props }: RootProps) {
    const [errors, setErrors] = useState(props.errors?.[options.name] as APIFormFieldError[] | undefined);
    const styleCol = {
        flexBasis: `${options.max_length / BASIS_COEFICIENT}rem`,
        flexGrow: `${options.max_length / GROW_COEFICIENT}`,
    };

    useEffect(() => {
        setErrors(props.errors?.[options.name] as APIFormFieldError[] | undefined);
    }, [props.errors, options.name]);

    return (
        <FormContext.Provider value={{ data: options, errors, setErrors }}>
            <div
                style={props.isFormStyle ? styleCol : {} }
                className={`position-relative w-100 ${props.className}`}>
                {children}
            </div>
        </FormContext.Provider>
    );
}
