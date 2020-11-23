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
                        (place.type === PlaceType.CLOTHING && !placeListParams.clothing) ||
                        (place.type === PlaceType.GROCERIES && !placeListParams.groceries)
                    ) {
                        return false;
                    }

                    if (
                        placeListParams.places && placeListParams.places.length
                    ) {
                        return placeListParams.places.indexOf(place.id) > -1;
                    }
    
                    return true;
                });
            });
    }
}