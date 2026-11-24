import { APIFormError, APIFormFieldError } from 'root/NumberTwo/@types/forms';
import { FormField } from 'root/NumberTwo/@types/forms/fields';
import { ReactElement, useEffect, useState } from 'react';
import { FormContext } from '.';
import { ErrorMessageProps } from './FieldError/ErrorMessage';
import { LabelProps } from './FieldLabel/ContextLabel';


export type Label = ReactElement<LabelProps> | ReactElement<LabelProps>[];
export type Input = ReactElement<FormField> | ReactElement<FormField>[];
export type Error = ReactElement<ErrorMessageProps> | ReactElement<ErrorMessageProps>[];

type FieldProps = {
    children: Label | Input | Error,
    className?: string,
    errors?: APIFormError,
    options?: FormField,
    kwargs?: {[key: string]: unknown},
}

export default function Field({ children, ...props }: FieldProps) {
    const [errors, setErrors] = useState(
        props.errors ? props.errors[props.options?.name ?? ''] as APIFormFieldError[] : undefined,
    );

    useEffect(() => {
        setErrors(props.errors?.[props.options?.name ?? ''] as APIFormFieldError[]);
    }, [props.errors, props.options]);

    const context = {
        data: props.options,
        kwargs: props.kwargs,
        errors,
        setErrors,
    };
    return (
        <FormContext.Provider value={context}>
            <div className={`position-relative h-fit w-full ${props.className ? props.className : ""}`}>
                {children}
            </div>
        </FormContext.Provider>
    );
}
