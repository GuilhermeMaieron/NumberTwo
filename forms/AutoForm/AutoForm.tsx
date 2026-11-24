// 'use client';
// import { APIFormError, FormField } from 'root/NumberTwo/@types/forms/';
// import { DefaultBotao, Flex } from 'root/NumberTwo/layout-basics';
// import { useId } from 'react';
// import styles from './AutoForm.module.scss';
// import { AutoFormField, handleSubmit } from './AutoFormUtils';

// type AutoFormProps = {
//     form: FormField[],
//     onSubmit?: (val: object) => void,
//     formId?: string,
//     erros?: APIFormError,
//     cancelarHref?: string,
//     hideSaveButton?: boolean,
//     noFormElement?: boolean,
//     deleteButton?: boolean,
//     deleteText?: string,
//     responseCode?: number,
//     children?: React.ReactNode,
//     setIsInProgress?: (status: boolean) => void,
// }

// const API_INTERNAL_ERROR = 500;
// const VALIDATION_ERROR = 400;

// export const AutoForm = ({ form, onSubmit, formId, erros, cancelarHref, hideSaveButton, noFormElement,
//     deleteButton, deleteText, responseCode, children, setIsInProgress }: AutoFormProps) => {
//     const id = useId();

//     const formularioId = `${formId ? formId : 'form_id'}`;

//     const content = (
//         <>
//             <div className="d-flex flex-wrap w-100 gap-3">
//                 {form.map((field: FormField, index: number) => (
//                     <AutoFormField field={field} erros={erros} key={`field_${id}_${index}`} />
//                 ))}
//                 {children}
//             </div>

//             {responseCode === API_INTERNAL_ERROR ? (
//                 <div className="position-relative w-100">
//                     <Flex className="text-danger pt-4">
//                         <i className="bi bi-exclamation-octagon-fill pe-2"></i>
//                         <span>Ocorreu um erro inesperado.</span>
//                     </Flex>
//                 </div>
//             ) : ''}
//             {responseCode === VALIDATION_ERROR ? (
//                 <div className="position-relative w-100">
//                     <Flex className="text-danger pt-4">
//                         <i className="bi bi-exclamation-triangle-fill pe-2"></i>
//                         <span>Verifique os campos inválidos.</span>
//                     </Flex>
//                 </div>
//             ) : ''
//             }

//             {(cancelarHref || !hideSaveButton) ? (
//                 <div className="row g-0 w-100 mt-4 d-flex">
//                     <div className={`col-12 col-md-6 ${styles.cancelBtnDiv}`}>
//                         {deleteButton && <Deletar deleteText={deleteText} />}
//                         {cancelarHref && <CancelarBtn cancelarHref={cancelarHref} />}
//                     </div>
//                     <div className={`col-12 col-md-6 ${styles.submitBtnDiv}`}>
//                         {!hideSaveButton && <EnviarBtn/>}
//                     </div>

//                 </div>
//             ) : ''}
//         </>
//     );

//     return (
//         <>
//             {(!noFormElement && onSubmit) ? (
//                 <form id={formularioId} onSubmit={(event: React.FormEvent) => {
//                     handleSubmit(event, formularioId, onSubmit, setIsInProgress);
//                 }}>
//                     {content}
//                 </form>
//             ) : (content)}
//         </>
//     );
// };

// function CancelarBtn({ cancelarHref }: {cancelarHref: string}) {
//     return (
//         <div className={styles.cancelarBtn}>
//             <DefaultBotao href={cancelarHref} neutral confirmClick >
//                 Cancelar
//             </DefaultBotao>
//         </div>
//     );
// }

// function EnviarBtn() {
//     return (
//         <div className={styles.saveBtn}>
//             <DefaultBotao type="submit" classExtra="gap-2">
//                 <i className="fa-solid fa-floppy-disk"></i>
//                 Salvar
//             </DefaultBotao>
//         </div>
//     );
// }

// function Deletar({ deleteText }: {deleteText: string | undefined}) {
//     return (
//         <div className="d-flex">
//             <DefaultBotao type="submit" confirmClick value="delete"
//                 confirmTexto={deleteText} danger name="delete"
//                 classExtra="gap-3">
//                 <i className="bi bi-trash-fill"></i>
//             </DefaultBotao>
//         </div>
//     );
// }
