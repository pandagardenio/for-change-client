import { AxiosResponse } from "axios";

import { ApiClient } from "../ApiClient";
import { Place, PlaceCategory } from "../models/Place";
import { PlaceListParams } from "../dto";

export class Places {
    constructor(
        private apiClient: ApiClient
    ) {}

    async all(placeListParams?: Partial<PlaceListParams>): Promise<Place[]> {
        return this.apiClient.get<Place[]>('places.json', placeListParams)
            .then((response: AxiosResponse<Place[]>) => response.data)
            .then((places: Place[]) => {
                if (!placeListParams) {
                    return places;
                }

                return places.filter((place: Place) => {
                    if (
                        (place.category === PlaceCategory.ACCOMMODATION && !placeListParams[PlaceCategory.ACCOMMODATION]) ||
                        (place.category === PlaceCategory.CAFE && !placeListParams[PlaceCategory.CAFE]) ||
                        (place.category === PlaceCategory.CLOTHING && !placeListParams[PlaceCategory.CLOTHING]) ||
                        (place.category === PlaceCategory.COMMUNITY && !placeListParams[PlaceCategory.COMMUNITY]) ||
                        (place.category === PlaceCategory.COSMETICS && !placeListParams[PlaceCategory.COSMETICS]) ||
                        (place.category === PlaceCategory.EVENT && !placeListParams[PlaceCategory.EVENT]) ||
                        (place.category === PlaceCategory.FARMING && !placeListParams[PlaceCategory.FARMING]) ||
                        (place.category === PlaceCategory.GROCERIES && !placeListParams[PlaceCategory.GROCERIES]) ||
                        (place.category === PlaceCategory.HOUSING && !placeListParams[PlaceCategory.HOUSING]) ||
                        (place.category === PlaceCategory.PROJECTS && !placeListParams[PlaceCategory.PROJECTS]) ||
                        (place.category === PlaceCategory.SHOPPING && !placeListParams[PlaceCategory.SHOPPING]) ||
                        (place.category === PlaceCategory.URBAN_GARDEN && !placeListParams[PlaceCategory.URBAN_GARDEN]) ||
                        (place.category === PlaceCategory.WINE_CELLAR && !placeListParams[PlaceCategory.WINE_CELLAR])
                    ) {
                        return false;
                    }
    
                    return true;
                });
            });
    }
}