'use client';
import { APIFormError, APIFormFieldError } from 'root/NumberTwo/@types/forms';
import { Source_Sans_3 } from 'next/font/google';
import { useEffect, useState } from 'react';
import styles from './FieldError.module.scss';

type FieldErrorProps = {
    erros: APIFormFieldError[] | APIFormError[] | {
        non_field_errors: APIFormFieldError[]
    }
}

const sansPro = Source_Sans_3({ weight: '400', subsets: ['latin'] });

export const FieldError = ({ erros }: FieldErrorProps) => {
    const [show, setShow] = useState(false);

    const erroList = Array.isArray(erros) ? erros : erros.non_field_errors;

    useEffect(() => {
        setShow(true);
    }, [erros]);


    return (
        <div className={`alert alert-danger ${styles.error} ${show ? styles.show : ''} p-0 ${sansPro.className}`}
            onClick={() => { setShow(!show); }} role="alert">
            {erroList.map((erro: APIFormFieldError | APIFormError, index: number) => {
                if (erro.message) {
                    return (
                        <div className="py-3 px-2" key={`erro_${index}`}>
                            {(erro as APIFormFieldError).message}
                        </div>
                    );
                }
                return Object.entries(erro as APIFormError).map(([key, value]) => (
                    <div className="d-flex flex-column py-2 px-2" key={`erro_${index}_${key}`}>
                        <span>{key}</span>
                        {(value as APIFormFieldError[]).map((campo, key2) => (
                            <span className="px-3" key={`erro_${index}_${key}_${key2}`}>
                                {campo.message}
                            </span>
                        ))}
                    </div>
                ));
            })}
        </div>

    );
};
