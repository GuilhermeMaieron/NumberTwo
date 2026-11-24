'use client';
import { APIFormFieldError } from 'root/NumberTwo/@types/forms';
import { SelectFieldType } from 'root/NumberTwo/@types/forms/fields';
import { SelectChoice } from 'root/NumberTwo/@types/utils';
import { Col } from 'root/NumberTwo/layout-basics';
import React from 'react';
import Select from 'react-select';
import { FieldError } from '../FieldError/FieldError';
import { FieldLabel } from '../FieldLabel/FieldLabel';
import { ValueContainer, getStyle, getThemeConfig } from './SelectConfigs';
import styles from './SelectField.module.scss';


type MultiSelectProps = {
    data: SelectFieldType,
    filtro?: boolean,
    onChange?: (value: SelectChoice) => void,
    invalid?: boolean,
    erros?: APIFormFieldError[],
    className?: string,
    isNotClearable?: boolean,
    isNotSearchable?: boolean,
    formatOptionLabel?: (option: SelectChoice) => React.ReactNode,
}
const TIMEOUT_DELAY = 10;
/**
 * @deprecated esse componente não é mais utilizado, use o componente
 * [Select]() no lugar.
*/
// eslint-disable-next-line max-lines-per-function
export function SelectField({ data, onChange, filtro, formatOptionLabel, invalid, erros, ...props }:MultiSelectProps) {
    let choices = data.choices;
    let defaultValue = null;

    if (filtro && !data.multiple) {
        choices = [{ value: '', label: 'Todos' }, ...choices];
        defaultValue = choices[0];
    }
    const value = getValue();

    function getValue() {
        const val = (data.value ? data.value : data.initial);

        if (data.multiple && !Array.isArray(val) && val) {
            return (JSON.parse(val).toString()).split(',');
        }
        return val;
    }

    if (value) {
        if (!data.multiple) {
            defaultValue = choices.filter(
                (choice: SelectChoice) => choice.value.toString() === value);
        } else {
            defaultValue = choices.filter(
                (choice: SelectChoice) => value.includes(choice.value.toString()));
        }
    }
    const onChangeWrapper = (newValue: SelectChoice | unknown) => {
        if (onChange) { setTimeout(() => { onChange(newValue as SelectChoice); }, TIMEOUT_DELAY); }
    };

    const valCont = ValueContainer as any;

    return (
        <Col className={`position-relative ${styles.div} ${props.className}`}>
            {!!data.label && (
                <FieldLabel forId={`id_${data.name}`} required={data.required}>
                    {data.label}
                </FieldLabel>
            )}

            <div className="d-flex flex-column" >
                <Select
                    classNamePrefix={'select'}
                    styles={getStyle(invalid)}
                    defaultValue={defaultValue}
                    instanceId={`id_${data.name}`}
                    isDisabled={data.disabled}
                    name={data.name}
                    theme = { getThemeConfig(data) }
                    isClearable={!props.isNotClearable && (!(filtro && !data.multiple))}
                    isMulti={data.multiple}
                    onChange={onChangeWrapper}
                    options={choices}

                    isSearchable={!props.isNotSearchable}
                    closeMenuOnSelect={!data.multiple}

                    formatOptionLabel={formatOptionLabel}

                    hideSelectedOptions={false}
                    placeholder={data.placeholder ? data.placeholder : 'Selecione'}
                    components={{
                        ValueContainer: valCont
                    }}
                    menuPortalTarget={ typeof window === 'undefined' ? undefined : document.body}
                    menuShouldScrollIntoView={false}
                />
            </div>
            {erros ? <FieldError erros={erros} /> : ''}
        </Col>
    );
}
