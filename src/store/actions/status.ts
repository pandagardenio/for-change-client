import { PlaceCategory } from "../../sdk/models";
import { MapStatusState } from "../reducers/status";

export const SET_PLACE_FILTERS = 'SET_PLACE_FILTERS';
export const TOGGLE_PLACES_FILTERS = 'TOGGLE_PLACE_FILTERS';
export const SET_SHOW_ONLY_LOVED_PLACES = 'SET_SHOW_ONLY_LOVED_PLACES';
export const SET_MAP = 'SET_MAP';
export const SET_MAP_CENTER = 'SET_MAP_CENTER';
export const SET_MAP_ZOOM = 'SET_MAP_ZOOM';

export type SetPlaceFiltersAction = {
    payload: Record<PlaceCategory, boolean>;
    type: typeof SET_PLACE_FILTERS;
};

export type TogglePlacesFiltersAction = {
    type: typeof TOGGLE_PLACES_FILTERS;
}

export type SetShowLovedPlacesAction = {
    payload: boolean;
    type: typeof SET_SHOW_ONLY_LOVED_PLACES;
};

export type SetMapction = {
    payload: MapStatusState;
    type: typeof SET_MAP;
}

export type SetMapCenterAction = {
    payload: [number, number];
    type: typeof SET_MAP_CENTER;
}

export type SetMapZoomAction = {
    payload: number;
    type: typeof SET_MAP_ZOOM;
}

export type StatusAction = SetPlaceFiltersAction |
    TogglePlacesFiltersAction |
    SetShowLovedPlacesAction |
    SetMapction |
    SetMapCenterAction |
    SetMapZoomAction;

export const setPlaceFilters = (placeFilters: Record<PlaceCategory, boolean>): SetPlaceFiltersAction => ({
    payload: placeFilters,
    type: SET_PLACE_FILTERS
});

export const togglesPlaceFilters = (): TogglePlacesFiltersAction => ({
    type: TOGGLE_PLACES_FILTERS
});

export const setShowLovedPlaces = (showLovedPlaces: boolean): SetShowLovedPlacesAction => ({
    payload: showLovedPlaces,
    type: SET_SHOW_ONLY_LOVED_PLACES
});

export const setMap = (map: MapStatusState): SetMapction => ({
    payload: map,
    type: SET_MAP
});

export const setMapCenter = (mapCenter: [number, number]): SetMapCenterAction => ({
    payload: mapCenter,
    type: SET_MAP_CENTER
});

export const setMapZoom = (mapZoom: number): SetMapZoomAction => ({
    payload: mapZoom,
    type: SET_MAP_ZOOM
});

