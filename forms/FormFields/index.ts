'use client';
import { FormField } from 'root/NumberTwo/@types/forms';
import { FormContextType } from 'root/NumberTwo/@types/forms/context';
import { createContext } from 'react';

export { CheckboxField } from './CheckboxField/CheckboxField';
export { ColorField } from './ColorField/ColorField';
export { FieldError } from './FieldError/FieldError';
export { FieldLabel } from './FieldLabel/FieldLabel';
export { FormsetField } from './FormsetField/FormsetField';
export { HiddenField } from './HiddenField/HiddenField';
export { MoneyField } from './MoneyField/MoneyField';
export { NumberField } from './NumberField/NumberField';
export { SelectField } from './SelectField/SelectField';
// export { UniqueCharField } from './UniqueCharField/UniqueCharField';
// export { FileField } from './FileField/FileField';
// export { AsyncSelectField } from './AsyncSelectField/AsyncSelectField';
// export { TextField } from './TextField/TextField';
// export { TimeField } from './TimeField/TimeField';
// export { DateField } from './DateField/DateField';
// export { CharField } from './CharField/CharField';


export const FormContext = createContext<FormContextType>({
    errors: undefined,
    setErrors: () => {},
    data: {} as FormField,
});

