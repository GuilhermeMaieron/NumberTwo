import { APIFormFieldError } from 'root/NumberTwo/@types/forms';
import { useContext } from 'react';
import { FormContext } from '..';
import errorStyle from './FieldError.module.scss';

export type ErrorMessageProps = {
    errors?: APIFormFieldError[],
}

export function ErrorMessage(props: ErrorMessageProps) {
    const context = useContext(FormContext);
    const errors = props.errors || context.errors;
    if (!errors) { return null; }

    return (
        <div className={`text-danger p-0 ${errorStyle.inlineError}`} role="alert">
            {errors[0]?.message}
        </div>
    );
}
