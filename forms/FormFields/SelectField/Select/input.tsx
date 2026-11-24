import { SelectContext } from 'root/NumberTwo/@types/forms/context';
import { SelectFieldType } from 'root/NumberTwo/@types/forms/fields';
import { SelectChoice } from 'root/NumberTwo/@types/utils';
import { useContext, useEffect, useState } from 'react';
import Select from 'react-select';
import { FormContext } from '../..';
import { SelectCustomStyle, ValueContainer, getStyle, getThemeConfig } from '../SelectConfigs';

type InputProps = {
    onChange?: (value: SelectChoice) => void;
    customStyles?: SelectCustomStyle,
    isFiltro?: boolean;
    isNotClearable?: boolean;
    isNotSearchable?: boolean;
    formatOptionLabel?: (option: unknown) => React.ReactNode;
    // Bolean para mudar o comportamento do select dentro de um modal
    menuPortalTarget?: HTMLElement | null;
    hideDropdownIndicator?: boolean
};

const TIMEOUT_DELAY = 10;

const SelectInput = ({ onChange, formatOptionLabel, ...props }: InputProps) => {
    const { data, errors, setErrors } = useContext(
        FormContext,
    ) as SelectContext;
    const [value, setValue] = useState<SelectChoice | unknown>(
        getDefaultValue(data, !!props.isFiltro),
    );
    const onChangeWrapper = (newValue: SelectChoice | unknown) => {
        setErrors?.(undefined);
        setValue(newValue);
        if (onChange) {
            setTimeout(() => {
                onChange(newValue as SelectChoice);
            }, TIMEOUT_DELAY);
        }
    };

    useEffect(() => {
        setValue(getDefaultValue(data, !!props.isFiltro));
    }, [data.value]);

    let components = {ValueContainer};

    if (props.hideDropdownIndicator)
    {
        components = {...components, DropdownIndicator: null} as any;
    }

    return (
        <div className='d-flex flex-column'>
            <Select
                classNamePrefix={'select'}
                styles={getStyle(!!errors, props.customStyles)}
                value={value}
                instanceId={`id_${data.name}`}
                isDisabled={data.disabled}
                name={data.name}
                theme={getThemeConfig(data)}
                isClearable={
                    !props.isNotClearable && !(props.isFiltro && !data.multiple)
                }
                isMulti={data.multiple}
                onChange={onChangeWrapper}
                options={getChoices(data, !!props.isFiltro)}
                isSearchable={!props.isNotSearchable}
                closeMenuOnSelect={!data.multiple}
                formatOptionLabel={formatOptionLabel}
                hideSelectedOptions={false}
                placeholder={data.placeholder ? data.placeholder : 'Selecione'}
                components={components}
                menuPortalTarget={props.menuPortalTarget}
                menuShouldScrollIntoView={false}
            />
        </div>
    );
};

export const Input = SelectInput;

/**
 * baseado nos dados calcula o defaultValue adequado para:
 * - filtro com valor multiplo
 * - filtro com valor unico
 * - field com valor multiplo
 * - field com valor unico
 */
function getDefaultValue(data: SelectFieldType, isFiltro: boolean) {
    let choices = data.choices;
    let value = data.value ? data.value : data.initial;
    // filtro com valor unico
    if (isFiltro && !data.multiple) {
        choices = [{ value: '', label: 'Todos' }, ...choices];
        return value
            ? choices.filter(
                  (choice: SelectChoice) => choice.value.toString() === value,
              )
            : choices[0];
    }

    // field com valor multiplo
    if (data.multiple && value != null) {
        value = Array.isArray(value)
            ? value
            : (typeof value === 'string' ? [value] : JSON.parse(value).toString().split(','));
        return choices.filter((choice: SelectChoice) =>
            value.includes(choice.value.toString()),
        );
    }

    // field com valor unico
    if (!data.multiple && value) {
        return choices.filter(
            (choice: SelectChoice) => choice.value.toString() === value,
        );
    }
    // filtro com valor multiplo
    return null;
}

function getChoices(data: SelectFieldType, isFiltro: boolean) {
    let choices = data.choices;

    // Adiciona option 'todos' no caso de filtro único
    if (isFiltro && !data.multiple) {
        choices = [{ value: '', label: 'Todos' }, ...data.choices];
    }

    return choices;
}
