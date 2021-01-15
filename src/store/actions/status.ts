import { PlaceType } from "../../sdk/models";

export const SET_PLACE_FILTERS = 'SET_PLACE_FILTERS';
export const SET_SHOW_ONLY_LOVED_PLACES = 'SET_SHOW_ONLY_LOVED_PLACES';

export type SetPlaceFiltersAction = {
    payload: Record<PlaceType, boolean>;
    type: typeof SET_PLACE_FILTERS;
};

export type SetShowLovedPlacesAction = {
    payload: boolean;
    type: typeof SET_SHOW_ONLY_LOVED_PLACES;
};

export type StatusAction = SetPlaceFiltersAction |
    SetShowLovedPlacesAction;

export const setPlaceFilters = (placeFilters: Record<PlaceType, boolean>): SetPlaceFiltersAction => ({
    payload: placeFilters,
    type: SET_PLACE_FILTERS
});

export const setShowLovedPlaces = (showLovedPlaces: boolean): SetShowLovedPlacesAction => ({
    payload: showLovedPlaces,
    type: SET_SHOW_ONLY_LOVED_PLACES
});
