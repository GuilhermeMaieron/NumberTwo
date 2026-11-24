import { SelectFieldType } from '@/koakuma/@types/forms/fields';

export type FormContextType = {
    errors?: APIFormFieldError[] | undefined;
    setErrors?: (errors: APIFormFieldError[] | undefined) => void;
    data?: FormField,
    kwargs?: {[key: string]: unknown},
}

type SelectContext = FormContextType & {
    data: SelectFieldType,
}

type CreatableSelectContext = {
    setErrors?: (errors: APIFormFieldError[] | undefined) => void;
    errors?: APIFormFieldError[] | undefined;
    data: SelectFieldType,
    kwargs: {
        creatableOptions: FormField
    }
}
