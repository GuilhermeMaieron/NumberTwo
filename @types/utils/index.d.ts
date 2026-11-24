export interface GenericAPIData {
    [key: string]: string | number | boolean,
    results?: {
        [key: string]: string | number | boolean,
    }[],
}
type GenericDetailAPIData = {
    [key: string]: number | string | boolean
}


export interface SelectChoice {
    value: string,
    label: string
}
export interface CreatableSelectChoice {
    value: string,
    label: string,
    __isNew__: boolean
}

export interface IFetch {
    [key: string]: string
}

export interface FetchProps {
    props: {
        data: {
            erro: boolean;
            erro_detail: APIFormError;
        };
    };
}

export type DefaultUserInfo = {
    username: string,
    full_name: string
}