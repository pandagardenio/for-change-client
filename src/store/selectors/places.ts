import { Place } from "../../sdk/models";
import { AppState } from "../reducers";

export const getLovedPlaces = (state: AppState): Place[] => state.places.love;

export const isPlaceLoved = (placeId: string): (state: AppState) => boolean =>
    (state: AppState): boolean => !!getLovedPlaces(state).filter((place: Place) => place.id === placeId).length;

export const getSelectedPlaces = (state: AppState): Place[] => state.places.selected;

export const isPlaceSelected = (placeId: string): (state: AppState) => boolean =>
    (state: AppState): boolean => !!getLovedPlaces(state).filter((place: Place) => place.id === placeId).length;