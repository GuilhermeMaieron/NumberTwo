'use client';
import Field from '../../Field';
import { ErrorMessage } from '../../FieldError/ErrorMessage';
import { ContextLabel } from '../../FieldLabel/ContextLabel';
import { FieldLabel } from '../../FieldLabel/FieldLabel';
import { Input } from './input';

export const Select = {
    AutoLabel: ContextLabel,
    Error: ErrorMessage ,
    Field,
    Input,
    Label: FieldLabel
};
