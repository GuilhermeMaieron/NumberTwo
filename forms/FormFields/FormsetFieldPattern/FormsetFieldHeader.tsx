import { DefaultBotao } from 'root/NumberTwo/layout-basics';
import { ReactNode, useContext } from 'react';
import { FieldLabel } from '../FieldLabel/FieldLabel';
import { FormsetContext } from './context/FormsetContext';

interface FormsetFieldHeaderProps {
  children?: ReactNode,
  headerNode?: ReactNode,
  formsetDisabled?: boolean,
}

const TIMEOUT_DELAY = 100;

export function FormsetFieldHeader({ children, headerNode, formsetDisabled = false } : FormsetFieldHeaderProps) {
    const formsetContext = useContext(FormsetContext);
    const data = formsetContext.data;
    const countErros = formsetContext.erros?.reduce(
        (acc, curr) => acc + Object.keys(curr).length, 0,
    );

    const id: string = `${new Date().getTime()}`;
    function addObj() {
        formsetContext.setformSet({ ...formsetContext.formSet, [id]: data.fields });
        formsetContext.setCount(formsetContext.count + 1);
        setTimeout(() => {
            document.getElementById(`scroll_div_formset_${formsetContext.id}`)?.scrollIntoView(
                { block: 'nearest', inline: 'nearest', behavior: 'smooth' });
        }, TIMEOUT_DELAY);
    }

    return (
        <div className='d-flex justify-content-between no-wrap mb-1'>
            <div className='d-flex gap-2 align-items-center'>
                <FieldLabel forId={`id_${data.name}`} required={data.required} extra_classes='gap-1'>
                    <DefaultBotao type='button' classExtra='p-1' onClickFunc={addObj} disabled={formsetDisabled}>
                        <i className="fa-solid fa-plus"/>
                    </DefaultBotao>
                </FieldLabel>
                <span className={formsetDisabled ? 'text-decoration-line-through' : ''}>
                    {data.label} ({formsetContext.count})
                    {headerNode}
                </span>
                { countErros > 0 && (
                    <span className='badge bg-danger'>{countErros} erro{ countErros > 1 && 's'}</span>
                )}
            </div>
            {children && (<div className='d-flex gap-4 align-items-center'>{children}</div>)}
        </div>
    );
}
