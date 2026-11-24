import { hiddenDataType } from 'root/NumberTwo/@types/forms/fields';


type HiddenFieldProps = {
    data: hiddenDataType,
}

export const HiddenField = ({ data }: HiddenFieldProps) => (
    <div className="position-absolute pe-none">
        <input type="hidden"
            className="position-absolute"
            defaultValue={data.value ? data.value : data.initial}
            id={`id_${data.name}`}
            name={data.name}
            readOnly={data.disabled}
            disabled={data.disabled}
            required={!!data.required}
        />
    </div>
);
