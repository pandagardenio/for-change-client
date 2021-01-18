import {
    ADD_LOVED_PLACE, PlacesAction, REMOVE_LOVED_PLACE, SET_LOVED_PLACES, SET_SELECTED_PLACES
} from '../actions/places';
import { Place } from '../../sdk/models';

export interface PlacesState {
    loved: Place[];
    selected: Place[];
}

export const initialState: PlacesState = {
    loved: [],
    selected: []
};

export const reducer = (state: PlacesState = initialState, action: PlacesAction): PlacesState => {
    switch (action.type) {
        case ADD_LOVED_PLACE: {
            return {
                ...state,
                loved: [...state.loved, action.payload]
            }

        }
        case REMOVE_LOVED_PLACE: {
            return {
                ...state,
                loved: state.loved.filter((place: Place) => place.slug !== action.payload)
            }
        }
        case SET_LOVED_PLACES: {
            return {
                ...state,
                loved: action.payload
            }
        }
        case SET_SELECTED_PLACES: {
            return {
                ...state,
                selected: action.payload
            }
        }
        default:
            return state;
    }
};
