import { APIFormError, FormField, FormsetField } from 'root/NumberTwo/@types/forms';
import { createContext } from 'react';

type FormsetContextType = {
    data: FormsetField,
    formSet: {[id: string]: FormField[]}
    id: string,
    count: number,
    erros: APIFormError[],
    setformSet: (data: {[id: string]: FormField[]}) => void,
    setCount: (count: number) => void
    rootCardId?: string,
};

export const FormsetContext = createContext<FormsetContextType>({
    data: {} as FormsetField,
    formSet: {},
    id: '',
    count: 0,
    erros: [],
    setformSet: (data: {[id: string]: FormField[]}) => null,
    setCount: (count: number) => null,
});
