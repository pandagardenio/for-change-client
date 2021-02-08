import { usePlaceCategories } from "./usePlaceCategories";
import { PlaceCategory, PlaceCategorySlug } from "../sdk/models";

export const usePlaceCategory = (
    placeCategorySlug: PlaceCategorySlug
): PlaceCategory | undefined => {
    const placeCategories = usePlaceCategories();
    console.log(placeCategories);
    return placeCategories.filter((placeCategory: PlaceCategory) => placeCategory.slug === placeCategorySlug)[0];
};