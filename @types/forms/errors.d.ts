export interface APIFormFieldError {
    message: string,
    code: string,
}

export interface APIFormError {
    [key: string]: APIFormFieldError[] | APIFormError[],
}
