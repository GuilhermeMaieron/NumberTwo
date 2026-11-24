'use client';
import { APIFormError, FormField, FormsetField as FormsetFieldType } from 'root/NumberTwo/@types/forms';
import { FormsetCardElement } from 'root/NumberTwo/@types/forms/fields';
import { DefaultBotao, DefaultCard } from 'root/NumberTwo/layout-basics';
import { useId, useState } from 'react';
import { FieldLabel } from '../FieldLabel/FieldLabel';
import { DefaultFormCard } from './DefaultFormCard';
import styles from './FormsetField.module.scss';

type FormsetFieldProps = {
    data: FormsetFieldType,
    erros: APIFormError[],
    invalid?: boolean
    formCard?: FormsetCardElement
}

const TIMEOUT_DELAY = 100;

export const FormsetField = ({ data, erros, ...props }: FormsetFieldProps) => {
    const [formSets, setformSets] = useState((
        data.value && data.value.length > 0) ? data.value : []);
    const id = useId();
    const [count, setCount] = useState(formSets.length);

    const nameAttr = { name: data.name };
    const errosList: APIFormError[] = erros || [];
    function addObj() {
        setformSets([...formSets, data.fields]);
        setCount(count + 1);
        setTimeout(() => {
            document.getElementById(`scroll_div_formset_${id}`)?.scrollIntoView(
                { block: 'start', inline: 'nearest', behavior: 'smooth' });
        }, TIMEOUT_DELAY);
    }
    function removeObj(cardId: string) {
        let arr = [...formSets];
        arr.splice(parseInt(cardId), 1);
        setCount(count - 1);
        setformSets(arr);
    }

    function setformSetField(form: FormField[], index:number) {
        const errosMap: APIFormError = errosList[index];
        if (!form) { return (<></>); }
        return (
            <div key={`formsetfield_${id}_${index}_${form.length}_${count}`} className='w-100'
                {...nameAttr} id="formset_obj_div">
                {props.formCard ?
                    <props.formCard form={form} id={`${index}`}
                        index={index}
                        onRemove={removeObj} erros={errosMap}/> :
                    <DefaultFormCard form={form} id={`${index}`}
                        index={index}
                        onRemove={removeObj} erros={errosMap}/>}
            </div>
        );
    }

    return (
        <div className={`${styles.formset}`}>
            <FieldLabel forId={`id_${data.name}`} required={data.required} extra_classes='gap-1 pb-1'>
                <DefaultBotao type='button' classExtra='p-1' onClickFunc={addObj}>
                    <i className="fa-solid fa-plus"/>
                </DefaultBotao>
                {data.label}
                <span>({count})</span>
            </FieldLabel>
            { count > 0 ? (
                <>
                    <DefaultCard classExtra={`${styles.formsetCard}`}>
                        <div className='p-2 d-flex flex-wrap gap-3'>
                            {formSets.map(setformSetField)}
                        </div>
                    </DefaultCard>
                    <div id={`scroll_div_formset_${id}`}/>
                </>
            ) : ''}
        </div>
    );
};
