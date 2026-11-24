export interface APIForm {
    fields: FormField[],
    [key: string]: string | boolean
}

export interface FormField {
    label: string,
    name: string,
    type?: string,
    required?: boolean,
    disabled?: boolean,
    value?: unknown,
    initial?: unknown,
    fields_name?: string[],
}

export type GenericField = FormField & {
    value: string
}

type FormsetField = FormField & {
    label: string,
    name: string,
    type: string,
    required: boolean,
    disabled: boolean,
    value: FormField[][]
    fields: FormField[]
}

export type TextFieldType = FormField & {
    tinymce?: boolean,
    default_height?: number,
    plugins?: string,
    toolbar?: string,
    initial?: string,
    value?: string,
}

export type CharFieldType = FormField & {
    type: 'text' | 'email',
    value: string,
    initial: string,
    max_length: number,
    min_length: number,
    placeholder: string,
}

export type SelectFieldType = FormField & {
    initial?: string,
    value?: string | SelectChoice | CreatableSelectChoice,
    choices: (SelectChoice | CreatableSelectChoice)[];
    multiple?: boolean,
    placeholder?: string,
};

export type TimeFieldType = FormField & {
    name: string,
    label: string,
    required?: boolean,
    value?: string,
    initial?: string,
    settings?: boolean,
    disabled?: boolean
    editable?: boolean
}

export type DateFieldType = FormField & {
    name: string,
    label: string,
    required?: boolean,
    value?: string[] | string[][],
    initial?: string[] | string[][],
    range?: boolean,
    multiple?: boolean,
    weekPicker?: boolean,
    yearPicker?: boolean,
    timePicker?: boolean,
    settings?: boolean,
    fields_name?: string[],
    disabled?: boolean
    editable?: boolean
}

export type FileFieldType = FormField & {
    value?: {
        path: string,
        name: string,
        type: string
    }
}


export type NumberFieldType = FormField & {
    type: 'number',
    value: number,
    initial: number,
    placeholder: string,
    integer?: false | true,
    pattern?: string,
};

export type CheckboxFieldType = FormField & {
    type: 'checkbox',
    value?: boolean,
    initial?: boolean,
};

export type MoneyFieldType = FormField & {
    value?: string,
    initial?: string,
    placeholder?: string,
}

export type FormCardProps = {
    form: FormField[],
    erros: APIFormError,
    id: string,
    index: number,
    onRemove: (index: string) => void,
}

export type FormsetCardElement = (props: FormCardProps) => JSX.Element;

export type hiddenDataType = FormField & {
    value: string | number,
    initial?: string | number,
}
