import { DefaultCard } from 'root/NumberTwo/layout-basics';
import { DefaultFormCard } from '../FormsetField/DefaultFormCard';

import { FormsetCardElement } from 'root/NumberTwo/@types/forms/fields';
import { useContext } from 'react';
import styles from './FormsetField.module.scss';
import { FormsetContext } from './context/FormsetContext';

interface FormsetFieldContentProps{
  customForm?: FormsetCardElement,
  className?: string,
}
export function FormsetFieldContent({ customForm: CustomForm, ...resto } : FormsetFieldContentProps) {
    const formsetContext = useContext(FormsetContext);

    function removeObj(id: string) {
        delete formsetContext.formSet[id];
        formsetContext.setCount(formsetContext.count - 1);
        formsetContext.setformSet(formsetContext.formSet);
    }

    return (
        <>
            {formsetContext.count > 0 ? (
                <DefaultCard classExtra={`${styles.formsetCard} p-2`}>
                    <div className={`d-flex flex-column gap-2 flex-wrap ${resto.className}`}>
                        {
                            Object.entries(formsetContext.formSet).map(([chave, value], index) => {
                                if (index === 0) { formsetContext.rootCardId = chave; }
                                const erros = formsetContext.erros[index];
                                return (
                                    <div key={chave} className='w-100'
                                        {...{ name: formsetContext.data.name }} id="formset_obj_div">

                                        {CustomForm ?
                                            <CustomForm form={value} id={chave} index={index}
                                                erros={erros} onRemove={removeObj} /> :

                                            <DefaultFormCard form={value} id={chave} index={index}
                                                erros={erros} onRemove={removeObj} /> }
                                    </div>
                                );
                            })
                        }
                    </div>
                    <div id={`scroll_div_formset_${formsetContext.id}`}/>
                </DefaultCard>
            ) : ''}
        </>
    );
}
