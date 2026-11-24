import { ErrorMessage } from '../../FieldError/ErrorMessage';
import { ContextLabel } from '../../FieldLabel/ContextLabel';
import { FieldLabel } from '../../FieldLabel/FieldLabel';
import { Input } from './input';
import { InputComma } from './inputComma';
import { Root } from './root';

export const NumberField = {
    Field: Root,
    Input,
    InputComma,
    Label: FieldLabel,
    AutoLabel: ContextLabel,
    Error: ErrorMessage,
};
