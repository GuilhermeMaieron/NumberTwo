import { FormCardProps } from 'root/NumberTwo/@types/forms/fields';
import { DefaultBotao, DefaultCard } from 'root/NumberTwo/layout-basics';


export function DefaultFormCard({ form, erros, id, onRemove }: FormCardProps) {
    return (
        <DefaultCard>
            <div className='p-2'>

                <div className='d-flex w-100 justify-content-end pt-2'>
                    <DefaultBotao confirmClick onClickFunc={() => { onRemove(id); }} type='button' danger>
                        <i className="fa-solid fa-trash" />
                    </DefaultBotao>
                </div>
            </div>
        </DefaultCard>
    );
}
