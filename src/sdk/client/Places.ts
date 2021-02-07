import { AxiosResponse } from "axios";

import { ApiClient } from "../ApiClient";
import { Place, PlaceCategorySlug } from "../models";
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
                        (place.categories.indexOf(PlaceCategorySlug.ACCOMMODATION) > -1  && !placeListParams[PlaceCategorySlug.ACCOMMODATION]) ||
                        (place.categories.indexOf(PlaceCategorySlug.CAFE) > -1 && !placeListParams[PlaceCategorySlug.CAFE]) ||
                        (place.categories.indexOf(PlaceCategorySlug.CLOTHING) > -1 && !placeListParams[PlaceCategorySlug.CLOTHING]) ||
                        (place.categories.indexOf(PlaceCategorySlug.COMMUNITY) > -1 && !placeListParams[PlaceCategorySlug.COMMUNITY]) ||
                        (place.categories.indexOf(PlaceCategorySlug.COSMETICS) > -1 && !placeListParams[PlaceCategorySlug.COSMETICS]) ||
                        (place.categories.indexOf(PlaceCategorySlug.EVENT) > -1 && !placeListParams[PlaceCategorySlug.EVENT]) ||
                        (place.categories.indexOf(PlaceCategorySlug.FARMING) > -1 && !placeListParams[PlaceCategorySlug.FARMING]) ||
                        (place.categories.indexOf(PlaceCategorySlug.GROCERIES) > -1 && !placeListParams[PlaceCategorySlug.GROCERIES]) ||
                        (place.categories.indexOf(PlaceCategorySlug.HOUSING) > -1 && !placeListParams[PlaceCategorySlug.HOUSING]) ||
                        (place.categories.indexOf(PlaceCategorySlug.PROJECTS) > -1 && !placeListParams[PlaceCategorySlug.PROJECTS]) ||
                        (place.categories.indexOf(PlaceCategorySlug.SHOPPING) > -1 && !placeListParams[PlaceCategorySlug.SHOPPING]) ||
                        (place.categories.indexOf(PlaceCategorySlug.URBAN_GARDEN) > -1 && !placeListParams[PlaceCategorySlug.URBAN_GARDEN]) ||
                        (place.categories.indexOf(PlaceCategorySlug.WINE_CELLAR) > -1 && !placeListParams[PlaceCategorySlug.WINE_CELLAR])
                    ) {
                        return false;
                    }
    
                    return true;
                });
            });
    }

    async get(placeSlug: string): Promise<Place> {
        return this.all()
            .then((places: Place[]) => places.filter((place: Place) => place.slug === placeSlug)[0])
            .then((place: Place | undefined) => {
                if (!place) {
                    throw new Error();
                }
                return place;
            });
    }
}