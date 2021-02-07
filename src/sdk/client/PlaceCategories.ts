import { AxiosResponse } from "axios";

import { ApiClient } from "../ApiClient";
import { PlaceCategory } from "../models";
import { PlaceCategoryListParams } from "../dto";

export class PlaceCategories {
    constructor(
        private apiClient: ApiClient
    ) {}

    async all(placeCategoryListParams?: Partial<PlaceCategoryListParams>): Promise<PlaceCategory[]> {
        return this.apiClient.get<PlaceCategory[]>('categories.json', placeCategoryListParams)
            .then((response: AxiosResponse<PlaceCategory[]>) => response.data);
    }
}