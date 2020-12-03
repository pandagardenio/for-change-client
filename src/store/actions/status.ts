import { PlaceDimension } from "../../sdk/models";

export const SET_PLACE_DIMENSION = 'SET_PLACE_DIMENSION';

export type SetPlaceDimensionAction = {
    payload: PlaceDimension;
    type: typeof SET_PLACE_DIMENSION;
};

export type StatusAction = SetPlaceDimensionAction;

export const setPlaceDimension = (placeDimension: PlaceDimension): SetPlaceDimensionAction => ({
    payload: placeDimension,
    type: SET_PLACE_DIMENSION
});
