import { usePlaceCategory } from "./usePlaceCategory";
import { Place, GroupedPlacesByCategory, PlaceCategory, PlaceCategorySlug } from "../sdk/models";

export const useGroupedPlace = (place: Place): Partial<GroupedPlacesByCategory> => {
    const placeCategories = place.categories.map(usePlaceCategory)
        .filter((placeCategory: PlaceCategory | undefined) => !!placeCategory) as PlaceCategory[];

    return placeCategories.reduce(
        (groupedPlacesByType: Partial<GroupedPlacesByCategory>, placeCategory: PlaceCategory | undefined): Partial<GroupedPlacesByCategory> => {
            if (!placeCategory) {
                return groupedPlacesByType;
            }

            let placesByPlaceCategory = groupedPlacesByType[placeCategory.slug];

            if (!placesByPlaceCategory) {
                placesByPlaceCategory = [];
            }

            placesByPlaceCategory.push(place);
            return {
                ...groupedPlacesByType,
                [placeCategory.slug]: placesByPlaceCategory
            }
        }, {}
    )};

export const useGroupedPlaces = (places: Place[]): GroupedPlacesByCategory =>
    places.map(useGroupedPlace).reduce((
        groupedPlaces: Partial<GroupedPlacesByCategory>,
        groupedPlace: Partial<GroupedPlacesByCategory>
    ) => Object.keys(groupedPlace).reduce((
            groupedPlaceReduced: Partial<GroupedPlacesByCategory>,
            placeCategorySlug: string
        ) => ({
                ...groupedPlaceReduced,
                [placeCategorySlug]:[
                    ...groupedPlaceReduced[placeCategorySlug as PlaceCategorySlug] as Place[] || [],
                    ...groupedPlace[placeCategorySlug as PlaceCategorySlug] as Place[] || [],
                ]
        }), groupedPlaces)
    , {}) as GroupedPlacesByCategory;