import { FormEvent } from 'react';

export { APIFormError, APIFormFieldError } from './errors';
export { APIForm, FormField, FormsetField } from './fields';


export interface OnSubmitFunction {
    (data: FormEvent): void | Promise<void>,
}
