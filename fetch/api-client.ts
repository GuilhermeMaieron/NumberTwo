import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';
import {
    CustomFetchProps,
    ErrorResponse,
    InvalidResponse,
    SuccessResponse,
} from './types';

/**
 * Classe singleton para gerenciar a instância da API.
 *
 * Ler doc para entender sobre o
 * [fetch e cache](https://nextjs.org/docs/app/api-reference/functions/fetch)
 * e sobre a
 * [remoção do cache](https://nextjs.org/docs/app/api-reference/functions/revalidateTag),
 *
 * Para habilitar cache:
 * `{ next: { revalidate: 10, tags: ['getCarros'] } }`
 *
 * Para remover o cache:
 * `revalidateTag('getCarros')`
 */
export class ApiClient {
    private static instance: ApiClient | undefined;
    private _apiUrl: string | undefined;
    private externalApi: boolean = false;

    private constructor() {
        this._apiUrl = undefined;
    }

    /**
     * Configura a URL base da API para todas as requisições feitas.
     */
    public setApiUrl(apiUrl: string) {
        this._apiUrl = apiUrl;
    }

    public setExternalApi(externalApi: boolean) {
        this.externalApi = externalApi;
    }

    private get apiUrl() {
        if (!this._apiUrl) {
            throw new Error('API URL não foi informada.');
        }
        return this._apiUrl;
    }

    public static getInstance(): ApiClient {
        if (!ApiClient.instance) {
            ApiClient.instance = new ApiClient();
        }
        return ApiClient.instance;
    }

    /**
     * Faz uma requisição GET para a API
     * @param url URL da API com search params já incluídos (ex: /users?name=John)
     * @param config Configurações da requisição
     * @template T Tipo do retorno da requisição
     * @returns Promise com o resultado da requisição
     */
    public async get<T>(url: string, init?: CustomFetchProps) {
        const { cache, ...config } = init || {};
        const resp = await fetch(`${this.apiUrl}${url}`, {
            method: 'GET',
            headers: await this.getHeaders({ withCSRF: false }),
            cache: cache || 'no-cache',
            ...config,
        });
        return this.responseHandler<T>(resp);
    }

    /**
     *  Faz uma requisição POST para a API
     * @param url URL da API
     * @param body Corpo da requisição
     * @param config Configurações da requisição
     * @returns Promise com o resultado da requisição
     * @template T Tipo do retorno da requisição
     */
    public async post<T>(
        url: string,
        body: RequestInit | object,
        config?: Omit<CustomFetchProps, 'body'>,
    ) {
        const resp = await fetch(`${this.apiUrl}${url}`, {
            method: 'POST',
            headers: await this.getHeaders({ withCSRF: true }),
            body: JSON.stringify(body),
            ...config,
        });

        return this.responseHandler<T>(resp);
    }

    public async patch<T>(
        url: string,
        body: RequestInit | object,
        init?: Omit<CustomFetchProps, 'body'>,
    ) {
        const resp = await fetch(`${this.apiUrl}${url}`, {
            method: 'PATCH',
            headers: await this.getHeaders({ withCSRF: true }),
            body: JSON.stringify(body),
            ...init,
        });

        return this.responseHandler<T>(resp);
    }

    /**
     * Faz uma requisição DELETE para a API
     * @param url URL da API
     * @param config Configurações da requisição
     * @returns Promise com o resultado da requisição
     * @template T Tipo do retorno da requisição
     */
    public async delete(url: string, config?: CustomFetchProps) {
        const resp = await fetch(`${this.apiUrl}${url}`, {
            method: 'DELETE',
            headers: await this.getHeaders({ withCSRF: true }),
            ...config,
        });

        if (resp.status === 204) {
            return { status: resp.status, data: null };
        }
    }

    public async options<T>(url: string, config: CustomFetchProps) {
        const resp = await fetch(`${this.apiUrl}${url}`, {
            method: 'OPTIONS',
            headers: await this.getHeaders({ withCSRF: false}),
            ...config,
        });

        return this.responseHandler<T>(resp) as Promise<{
            status: number;
            data: T;
        }>;
    }

    private async responseHandler<T>(response: Response) {
        const res = response;

        if ([200, 201].includes(res.status)) {
            const data = await res.json();
            return { status: res.status, data: data } as SuccessResponse<T>;
        }
        if ([400].includes(res.status)) {
            const data = await res.json();
            return { status: res.status, data: data } as InvalidResponse;
        }

        if ([403, 404].includes(res.status)) {
            const data = await res.json();
            return { status: res.status, data: data } as ErrorResponse;
        }
        if (res.status === 401) {
            redirect(`${this.apiUrl}/login_view/`);
        }

        throw new Error(
            `Requisição retornou ${res.status} - ${res.statusText}`,
        );
    }

    private async getHeaders({withCSRF}: {withCSRF: boolean;}): Promise<HeadersInit> {

        if (this.externalApi) {
            return {
            Accept: 'application/json',
        };
        }


        const heads = await headers();
        const csrf =
            (withCSRF && ((await cookies()).get('csrftoken')?.value)) || '';
        const referer = (withCSRF && heads.get('referer')) || '';
        const cookie = heads.get('cookie') || '';

        return {
            'Content-Type': 'application/json',
            Connection: 'keep-alive',
            'Accept-Language': 'pt-br',
            Cookie: cookie,
            Referer: referer,
            'X-CSRFToken': csrf,
        };
    }
}
