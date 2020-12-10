import { PlaceDimension } from './PlaceDimension';
import { PlaceType } from "./PlaceType";

export type GroupedPlacesByType = Record<PlaceType, Place[]>;
export type GroupedPlacesByTypeCount = Record<PlaceType, number>;

export type Place = {
    description: string;
    id: string;
    location: {
        lat: number;
        lng: number;
    };
    [PlaceDimension.ONLINE]: boolean;
    [PlaceDimension.PHYSICAL]: boolean;
    name: string;
    url: string;
    type: PlaceType;
}

export const getGroupedPlacesByType = (places: Place[]): GroupedPlacesByType => {
    return places.reduce((groupedPlacesByType: Partial<GroupedPlacesByType>, place: Place): Partial<GroupedPlacesByType> => {
        let placesByPlaceType = groupedPlacesByType[place.type];

        if (!placesByPlaceType) {
            placesByPlaceType = [];
        }

        placesByPlaceType.push(place);

        return {
            ...groupedPlacesByType,
            [place.type]: placesByPlaceType
        }
    }, {}) as GroupedPlacesByType;
};

export const getGroupedPlacesByTypeCount = (places: Place[], groupedPlacesByType = getGroupedPlacesByType(places)): GroupedPlacesByTypeCount => {
    return Object.keys(groupedPlacesByType).reduce<Partial<GroupedPlacesByTypeCount>>((groupedPlaces: Partial<GroupedPlacesByTypeCount>, placeType: string): Partial<GroupedPlacesByTypeCount> => {
        return {
            ...groupedPlaces,
            [placeType]: groupedPlacesByType[placeType as PlaceType].length
        }
    }, {} as Partial<GroupedPlacesByTypeCount>) as GroupedPlacesByTypeCount;
};
