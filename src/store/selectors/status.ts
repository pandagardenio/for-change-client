import { PlaceCategory } from "../../sdk/models";
import { AppState } from "../reducers";
import { MapStatusState } from "../reducers/status";

export const getPlacesFilters = (state: AppState): Record<PlaceCategory, boolean> => state.status.placesFilters;
export const getShowPlacesFilters = (state: AppState): boolean => state.status.showPlacesFilters;
export const getShowOnlyLovedPlaces = (state: AppState): boolean => state.status.showOnlyLovedPlaces;
export const getMap = (state: AppState): MapStatusState => state.status.map;
export const getMapCenter = (state: AppState): [number, number] => state.status.map.center;
export const getMapZoom = (state: AppState): number => state.status.map.zoom;