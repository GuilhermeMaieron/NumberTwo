import { ErrorMessage } from '../../FieldError/ErrorMessage';
import { ContextLabel } from '../../FieldLabel/ContextLabel';
import { FieldLabel } from '../../FieldLabel/FieldLabel';
import { Root } from '../../NumberField/Number/root';
import Input from './input';

export const MoneyField = {
    Field: Root,
    Input,
    Label: FieldLabel,
    AutoLabel: ContextLabel,
    Error: ErrorMessage,
};
