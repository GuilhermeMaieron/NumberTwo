export type CustomFetchProps = Omit<RequestInit, 'method' | 'headers'>;

// Request types
export type BadRequest = { code: 'bad_request'; message: string };

// Response types
export type ErrorResponse = {
    status: 403 | 404 | 500 | 401;
    data: BadRequest;
};

export type InvalidResponse = {
    status: 400;
    data: InvalidData;
};

export type SuccessResponse<T> = {
    status: 200 | 201;
    data: T;
};

// Data types
export type InvalidData = {
    [key: string]: string[] | InvalidData[];
};

export interface APIDataList<T> {
    pagina: number;
    ultima_pagina: number;
    count: number;
    results: T[];
}
