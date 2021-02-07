import { AxiosResponse } from 'axios';
import Promise from 'bluebird';

import { ApiClient } from './ApiClient';
import { RegisterDto } from './dto';
import { PlaceCategories, Places } from './client';
import { Auth, IAuthApiResponse } from './models';

export class Sdk {
    public places: Places = new Places(this.apiClient);
    public placeCategories: PlaceCategories = new PlaceCategories(this.apiClient);

    constructor(
        private apiClient: ApiClient
    ) {}

    async login(email: string, password: string): Promise<Auth> {
        return this.apiClient.post<IAuthApiResponse>('/login', {
                email,
                password
            })
            .then((response: AxiosResponse<IAuthApiResponse>) => Auth.createFromResponse(response.data))
    }

    async register(registerDto: RegisterDto): Promise<Auth> {
        return this.apiClient.post<IAuthApiResponse>('/register/doctor', registerDto)
            .then((response: AxiosResponse<IAuthApiResponse>) => Auth.createFromResponse(response.data));
    }

    setAuthorization(auth: Auth): void {
        this.apiClient.setAuthorization(auth);
    }
}