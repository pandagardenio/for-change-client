import { Place } from "../../sdk/models";

export const ADD_LOVED_PLACE = 'ADD_LOVED_PLACE';
export const REMOVE_LOVED_PLACE = 'REMOVE_LOVED_PLACE';
export const SET_LOVED_PLACES = 'SET_LOVED_PLACES';
export const SET_SELECTED_PLACES = 'SET_SELECTED_PLACES';

export type AddLovedPlaceAction = {
    payload: Place;
    type: typeof ADD_LOVED_PLACE;
};

export type RemoveLovedPlaceAction = {
    payload: string;
    type: typeof REMOVE_LOVED_PLACE;
};

export type SetLovedPlacesAction = {
    payload: Place[];
    type: typeof SET_LOVED_PLACES;
};

export type SetSelectedPlacesAction = {
    payload: Place[];
    type: typeof SET_SELECTED_PLACES;
};

export type PlacesAction = AddLovedPlaceAction |
    RemoveLovedPlaceAction |
    SetLovedPlacesAction |
    SetSelectedPlacesAction;

export const addLovedPlace = (place: Place): AddLovedPlaceAction => ({
    payload: place,
    type: ADD_LOVED_PLACE
});

export const removeLovedPlace = (placeId: string): RemoveLovedPlaceAction => ({
    payload: placeId,
    type: REMOVE_LOVED_PLACE
});

export const setLovedPlaces = (places: Place[]): SetLovedPlacesAction => ({
    payload: places,
    type: SET_LOVED_PLACES
});

export const setSelectedPlaces = (places: Place[]): SetSelectedPlacesAction => ({
    payload: places,
    type: SET_SELECTED_PLACES
});
