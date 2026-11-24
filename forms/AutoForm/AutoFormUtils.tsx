// import {
//     APIFormError,
//     APIFormFieldError,
//     FormField,
//     FormsetField as FormsetFieldType,
// } from '@/koakuma/@types/forms';
// import {
//     CharFieldType,
//     CheckboxFieldType,
//     DateFieldType,
//     FileFieldType,
//     NumberFieldType,
//     SelectFieldType,
//     TextFieldType,
//     TimeFieldType,
//     hiddenDataType,
// } from '@/koakuma/@types/forms/fields';
// import { FormEvent } from 'react';
// import {
//     AsyncSelectField,
//     CharField,
//     CheckboxField,
//     DateField,
//     FileField,
//     HiddenField,
//     NumberField,
//     TextField,
//     TimeField,
//     UniqueCharField,
// } from '../FormFields';
// import { ColorField } from '../FormFields/ColorField/ColorField';
// import { FormsetFieldContent } from '../FormFields/FormsetFieldPattern/FormsetFieldContent';
// import { FormsetFieldHeader } from '../FormFields/FormsetFieldPattern/FormsetFieldHeader';
// import { FormsetFieldRoot } from '../FormFields/FormsetFieldPattern/FormsetFieldRoot';
// import { MoneyField } from '../FormFields/MoneyField/Money';
// import { Select } from '../FormFields/SelectField/Select';

// type FormFieldProps = {
//     field: FormField;
//     erros?: APIFormError;
// };

// export function AutoFormField({ field, erros }: FormFieldProps) {
//     let invalid = false;
//     if (erros) {
//         if (erros[field.name]) {
//             invalid = true;
//         }

//         if (field.fields_name) {
//             field.fields_name.forEach((fieldVar: string) => {
//                 if (Object.keys(erros).includes(fieldVar)) {
//                     erros[field.name] = [];
//                     invalid = true;

//                     erros[fieldVar].forEach((erro) => {
//                         (erros[field.name] as APIFormFieldError[]).push(
//                             erro as APIFormFieldError,
//                         );
//                     });
//                 }
//             });
//         }
//     }

//     return getFormField(field, invalid, erros);
// }

// export function getFormField(
//     field: FormField,
//     invalid?: boolean,
//     erros?: APIFormError,
// ) {
//     const errosField = erros ? erros[field.name] : undefined;
//     const errosFieldGeneric = errosField as APIFormFieldError[];
//     switch (field.type) {
//         case 'formset':
//             return (
//                 <FormsetFieldRoot
//                     data={field as FormsetFieldType}
//                     erros={errosField as APIFormError[]}
//                 >
//                     <FormsetFieldHeader />
//                     <FormsetFieldContent />
//                 </FormsetFieldRoot>
//             );
//         case 'hidden':
//             return <HiddenField data={field as hiddenDataType} />;
//         case 'email':
//             return (
//                 <CharField
//                     data={field as CharFieldType}
//                     invalid={invalid}
//                     type='email'
//                     erros={errosFieldGeneric}
//                 />
//             );
//         case 'text':
//             return (
//                 <CharField
//                     data={field as CharFieldType}
//                     invalid={invalid}
//                     erros={errosFieldGeneric}
//                 />
//             );
//         case 'unique_text':
//             return (
//                 <UniqueCharField
//                     data={field}
//                     invalid={invalid}
//                     erros={errosFieldGeneric}
//                 />
//             );
//         case 'text_area':
//             return (
//                 <TextField
//                     data={field as TextFieldType}
//                     invalid={invalid}
//                     erros={errosFieldGeneric}
//                 />
//             );
//         case 'number':
//             return (
//                 <NumberField
//                     data={field as NumberFieldType}
//                     invalid={invalid}
//                     erros={errosFieldGeneric}
//                 />
//             );
//         case 'color':
//             return (
//                 <ColorField
//                     data={field}
//                     invalid={invalid}
//                     erros={errosFieldGeneric}
//                 />
//             );
//         case 'checkbox':
//             return (
//                 <CheckboxField
//                     data={field as CheckboxFieldType}
//                     invalid={invalid}
//                     erros={errosFieldGeneric}
//                 />
//             );
//         case 'float':
//             return (
//                 <NumberField
//                     data={field as NumberFieldType}
//                     invalid={invalid}
//                     erros={errosFieldGeneric}
//                 />
//             );
//         case 'money':
//             return (
//                 <MoneyField.Field
//                     options={field as NumberFieldType}
//                     errors={erros}
//                     className='flex-shrink-1 flex-grow-0'
//                 >
//                     <MoneyField.AutoLabel />
//                     <MoneyField.Input />
//                     <MoneyField.Error />
//                 </MoneyField.Field>
//             );
//         case 'select':
//             return (
//                 <Select.Field
//                     options={field as SelectFieldType}
//                     errors={erros}
//                     className='flex-shrink-0 flex-grow-1'
//                 >
//                     <Select.AutoLabel />
//                     <Select.Input />
//                     <Select.Error />
//                 </Select.Field>
//             );
//         case 'multi_date':
//             return (
//                 <DateField
//                     data={field as DateFieldType}
//                     invalid={invalid}
//                     erros={errosFieldGeneric}
//                 />
//             );
//         case 'time':
//             return (
//                 <TimeField
//                     data={field as TimeFieldType}
//                     invalid={invalid}
//                     erros={errosFieldGeneric}
//                 />
//             );
//         case 'search_select':
//             return (
//                 <AsyncSelectField
//                     data={field}
//                     invalid={invalid}
//                     erros={errosFieldGeneric}
//                 />
//             );
//         case 'date':
//             return (
//                 <DateField
//                     data={field as DateFieldType}
//                     invalid={invalid}
//                     erros={errosFieldGeneric}
//                 />
//             );
//         case 'file':
//             return (
//                 <FileField
//                     data={field as FileFieldType}
//                     invalid={invalid}
//                     erros={errosField}
//                 />
//             );
//     }
//     return <></>;
// }

// const toBase64 = (file: File) =>
//     new Promise<string>((resolve, reject) => {
//         const reader = new FileReader();
//         reader.onload = () => {
//             const base64 = reader.result as string;
//             resolve(base64);
//         };
//         reader.onerror = reject;
//         reader.readAsDataURL(file);
//     });

// type DataFormType = {
//     [key: string]: FormDataEntryValue | FormDataEntryValue[] | DataFormType[];
// };

// export async function formDataToDict(formd: FormData) {
//     const formDataObj: DataFormType = {};
//     const myFiles: File[] = [];
//     const myNames: string[] = [];

//     formd.forEach((value, key) => {
//         const v = formDataObj[key];
//         if (v && !Array.isArray(v)) {
//             formDataObj[key] = [v as FormDataEntryValue];
//         }

//         try {
//             if ((value as string).startsWith('js0nP4rs3_')) {
//                 value = JSON.parse((value as string).replace('js0nP4rs3_', ''));
//             }
//         } catch {
//             /* Do nothing*/
//         }

//         if (value instanceof File && value.size > 0) {
//             myFiles.push(value);
//             myNames.push(key);
//         }

//         if (Array.isArray(formDataObj[key])) {
//             (formDataObj[key] as FormDataEntryValue[]).push(value);
//         } else if (value) {
//             formDataObj[key] = value;
//         }
//     });
//     for (let i = 0; i < myFiles.length; i++) {
//         const myFile = myFiles[i];
//         const myName = myNames[i];

//         formDataObj[myName] = await toBase64(myFile);
//     }

//     return formDataObj;
// }

// export async function handleSubmit<T extends object>(
//     event: FormEvent,
//     formularioId: string,
//     onSubmit: (val: T) => void,
//     setIsInProgress?: (status: boolean) => void,
// ) {
//     if (event.type === 'submit') {
//         event.preventDefault();
//     }
//     if (setIsInProgress) {
//         setIsInProgress(true);
//     }

//     const form = document.getElementById(formularioId) as HTMLFormElement;
//     if (!form) {
//         return;
//     }

//     let formDataObj = await formDataToDict(new FormData(form));
//     formDataObj = await setFormsetFields(formDataObj, form);

//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     if ((event?.nativeEvent as any).submitter) {
//         // eslint-disable-next-line @typescript-eslint/no-explicit-any
//         formDataObj[(event?.nativeEvent as any).submitter.name] = (
//             event?.nativeEvent as any
//         ).submitter.value;
//     }

//     onSubmit(formDataObj as T);
// }

// export async function setFormsetFields(
//     formDataObj: DataFormType,
//     form: HTMLFormElement,
// ) {
//     const formsetsDiv = form.querySelectorAll('#formset_obj_div');
//     const countFormsets: { [key: string]: number } = {};

//     formsetsDiv.forEach(async (fdiv: Element) => {
//         const name = fdiv.getAttribute('name');
//         if (!name) {
//             return;
//         }

//         countFormsets[name] = (countFormsets[name] || 0) + 1;

//         if (countFormsets[name] === 1) {
//             formDataObj[name] = [];
//         }

//         const inputs = fdiv.querySelectorAll('input, textarea');
//         const formsetFormdata = new FormData();

//         inputs.forEach((inp: HTMLInputElement | any) => {
//             if (inp.name) {
//                 delete formDataObj[inp.name];
//                 formsetFormdata.append(inp.name, inp.value);
//             }
//         });

//         const object = await formDataToDict(formsetFormdata);

//         (formDataObj[name] as DataFormType[]).push(object);
//     });
//     return formDataObj;
// }
