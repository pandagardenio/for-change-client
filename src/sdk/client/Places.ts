import { AxiosResponse } from "axios";

import { ApiClient } from "../ApiClient";
import { Place } from "../models/Place";

export class Places {
    constructor(
        private apiClient: ApiClient
    ) {}

    async all(): Promise<Place[]> {
        return this.apiClient.get<Place[]>('data/places.json')
            .then((response: AxiosResponse<Place[]>) => response.data);
    }
}