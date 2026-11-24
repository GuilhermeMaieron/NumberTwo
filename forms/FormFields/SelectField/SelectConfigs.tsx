import { SelectFieldType } from 'root/NumberTwo/@types/forms/fields';
import { Children, isValidElement, ReactNode } from 'react';
import {
    CSSObjectWithLabel,
    ValueContainerProps,
    components,
} from 'react-select';

export function ValueContainer({ children, ...props }: ValueContainerProps) {
    let [values, input] = children as ReactNode[];

    if (Array.isArray(values)) {
        const items = Children.toArray(values);

        const val = (i: number): string => {
            const item = items[i];

            if (isValidElement<{ children?: ReactNode }>(item)) {
                return String(item.props.children ?? '');
            }

            return String(item ?? '');
        };

        switch (items.length) {
            case 0:
                values = '';
                break;

            case 1:
                values = val(0);
                break;

            case 2:
                values = `${val(0)}, ${val(1)}`;
                break;

            default: {
                const otherCount = items.length - 2;
                const plural = otherCount === 1 ? '' : 's';

                values = `${val(0)}, ${val(1)} e ${otherCount} outro${plural} selecionado${plural}`;
                break;
            }
        }
    }
    return (
        <components.ValueContainer {...props}>
            {values}
            {input}
        </components.ValueContainer>
    );
}
// ComponentType<ValueContainerProps<SelectChoice, boolean, GroupBase<SelectChoice>>> | undefined

export type SelectCustomStyle = {
    control?: CSSObjectWithLabel,
    container?: CSSObjectWithLabel,
    menu?: CSSObjectWithLabel,
    menuPortal?: CSSObjectWithLabel,
    option?: CSSObjectWithLabel,
    multiValue?: CSSObjectWithLabel,
}

export function getStyle(invalid: boolean | undefined, customStyle?: SelectCustomStyle) {
    return {
        control: (baseStyles: CSSObjectWithLabel, state: any) => ({
            ...baseStyles,
            borderColor: `${invalid ? 'var(--accent)' : state.isFocused ? 'var(--foreground)' : 'var(--border)'} !important`,
            boxShadow: state.isFocused
                ? `0 0 0 0.2rem ${invalid ? 'rgba(255, 0, 0, 0.2)' : 'var(--bs-primary-bg-subtle)'}`
                : 'none',
            color: 'var(--foreground)',
            maxWidth: '100% !important',
            width: '100%',
            transition: 'background-color 0.2s',
            ...customStyle?.control
        }),
        container: (baseStyles: CSSObjectWithLabel) => ({
            ...baseStyles,
            fontSize: '0.875rem !important',
            ...customStyle?.container
        }),
        menu: (base: CSSObjectWithLabel) => ({
            ...base,
            zIndex: 50,
            fontSize: '0.875rem',
            ...customStyle?.menu
        }),
        menuPortal: (base: CSSObjectWithLabel) => ({
            ...base,
            zIndex: 9999,
            ...customStyle?.menuPortal
        }),
        option: (baseStyles: CSSObjectWithLabel, state: any) => ({
            ...baseStyles,
            color: state.isSelected ? 'white' : 'var(--cor_mono_fraco)',
            backgroundColor: state.isSelected ? "var(--foreground)" : "var(--background)",
            ...customStyle?.option
        }),
        multiValue: (baseStyles: CSSObjectWithLabel) => ({
            ...baseStyles,
            backgroundColor: 'var(--cor_principal_alt)',
            borderWidth: '1px',
            borderStyle: 'solid',
            borderColor: 'var(--cor_mono_muito_fraco)',
            ...customStyle?.multiValue
        }),
    };
}

export function getThemeConfig(data: SelectFieldType) {
    const SelectTheme = (theme: any) => ({
        ...theme,
        colors: {
            ...theme.colors,
            neutral0: `${data.disabled ? 'var(--background)' : 'var(--background)'}`,
            neutral80: 'var(--background)',
            primary: 'var(--background)',
            primary25: 'var(--background)',
            primary50: 'var(--background)',
        },
    });
    return SelectTheme;
}
