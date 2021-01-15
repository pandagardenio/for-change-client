import { PlaceType } from "../../sdk/models";
import { AppState } from "../reducers";

export const getPlacesFilters = (state: AppState): Record<PlaceType, boolean> => state.status.placesFilters;
export const getShowOnlyLovedPlaces = (state: AppState): boolean => state.status.showOnlyLovedPlaces;
