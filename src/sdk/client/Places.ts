import { AxiosResponse } from "axios";

import { ApiClient } from "../ApiClient";
import { Place, PlaceType } from "../models/Place";
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
                        (place.type === PlaceType.ASSOCIATION && !placeListParams[PlaceType.ASSOCIATION]) ||
                        (place.type === PlaceType.CAFE && !placeListParams[PlaceType.CAFE]) ||
                        (place.type === PlaceType.CLOTHING && !placeListParams[PlaceType.CLOTHING]) ||
                        (place.type === PlaceType.COMMUNITY && !placeListParams[PlaceType.COMMUNITY]) ||
                        (place.type === PlaceType.EVENT && !placeListParams[PlaceType.EVENT]) ||
                        (place.type === PlaceType.FARMING && !placeListParams[PlaceType.FARMING]) ||
                        (place.type === PlaceType.GROCERIES && !placeListParams[PlaceType.GROCERIES]) ||
                        (place.type === PlaceType.HOUSING && !placeListParams[PlaceType.HOUSING]) ||
                        (place.type === PlaceType.PROJECTS && !placeListParams[PlaceType.PROJECTS]) ||
                        (place.type === PlaceType.SHOPPING && !placeListParams[PlaceType.SHOPPING]) ||
                        (place.type === PlaceType.URBAN_GARDEN && !placeListParams[PlaceType.URBAN_GARDEN])
                    ) {
                        return false;
                    }
    
                    return true;
                });
            });
    }
}