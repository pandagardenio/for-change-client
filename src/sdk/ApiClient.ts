import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import Promise from 'bluebird';
import PubSub from 'pubsub-js';

import { Auth } from './models/Auth';

Promise.config({
    cancellation: true,
    warnings: false
});

export interface IApiClientConfig {
    baseUrl: string;
}

export enum ApiClientRequestMethod {
    DELETE = 'DELETE',
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT'
}

export class ApiClient {
    client: AxiosInstance;

    constructor(
        private config: IApiClientConfig,
        private auth?: Auth
    ) {
        this.client = this.createClient(
            this.config.baseUrl,
            this.auth && this.auth.token
        );
    }

    get<T>(
        endpoint: string,
        params?: object,
        headers?: object,
        paramsSerializer?: (params: object) => string
    ): Promise<AxiosResponse<T>> {
        return this.request<T>(
            ApiClientRequestMethod.GET,
            endpoint,
            params,
            undefined,
            headers,
            paramsSerializer
        );
    }

    delete<T>(
        endpoint: string,
        params?: object,
        headers?: object
    ): Promise<AxiosResponse<T>> {
        return this.request<T>(
            ApiClientRequestMethod.DELETE,
            endpoint,
            params,
            undefined,
            headers
        );
    }

    post<T>(
        endpoint: string,
        body?: object,
        params?: object,
        headers?: object
    ): Promise<AxiosResponse<T>> {
        return this.request<T>(
            ApiClientRequestMethod.POST,
            endpoint,
            params,
            body,
            headers
        );
    }

    put<T>(
        endpoint: string,
        body?: any,
        params?: object,
        headers?: object
    ): Promise<AxiosResponse<T>> {
        return this.request<T>(
            ApiClientRequestMethod.PUT,
            endpoint,
            params,
            body,
            headers
        );
    }

    getAuthorization(): Auth | undefined {
        return this.auth;
    }

    setAuthorization(auth?: Auth): void {
        this.auth = auth;

        if (this.auth) {
            this.client.defaults.headers.common.Authorization = `Bearer ${auth?.token}`;
        } else {
            delete this.client.defaults.headers.common.Authorization;
        }
    }

    private request<T>(
        method: ApiClientRequestMethod,
        url: string,
        params?: object,
        data?: object,
        headers: object = {},
        paramsSerializer?: (params: object) => string
    ): Promise<AxiosResponse<T>> {
        const cancelTokenSource = axios.CancelToken.source();
        const requestConfig: AxiosRequestConfig = {
            cancelToken: cancelTokenSource.token,
            data,
            headers,
            method,
            params,
            paramsSerializer,
            url
        };

        return new Promise<AxiosResponse<T>>((
            resolve: (value?: AxiosResponse<T> | PromiseLike<AxiosResponse<T>>) => void,
            reject: (reason?: any) => void,
            onCancel?: (callback: () => void) => void
        ): void  => {
            this.client.request<T>(requestConfig)
                .then(resolve)
                .catch(reject);
            onCancel && onCancel(() => {
                cancelTokenSource.cancel();
            });
        });
    }

    private createClient(apiUrl: string, authToken?: string): AxiosInstance {
        const baseURL = apiUrl.charAt(apiUrl.length - 1) === '/' ? apiUrl : `${apiUrl}/`;
        const client = axios.create({ baseURL });

        client.defaults.headers.common['Content-Type'] = 'application/json';
        client.defaults.headers.common.Authorization = `Bearer ${authToken}`;

        client.interceptors.response.use((response: AxiosResponse<any>) => {
            return response;
        }, (error: AxiosError<any>) => {
            if (401 === error.response?.status) {
                PubSub.publish('auth::delete', null);
            } else {
                return Promise.reject(error);
            }
        });
        return client;
    }
}