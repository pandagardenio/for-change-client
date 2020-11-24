import { ADD_LOVED_PLACE, PlacesAction, REMOVE_LOVED_PLACE, SET_LOVED_PLACES } from '../actions/places';
import { Place } from '../../sdk/models';

export interface PlacesState {
    love: Place[];
}

export const initialState: PlacesState = {
    love: []
};

export const reducer = (state: PlacesState = initialState, action: PlacesAction): PlacesState => {
    switch (action.type) {
        case ADD_LOVED_PLACE: {
            return {
                ...state,
                love: [...state.love, action.payload]
            }

        }
        case REMOVE_LOVED_PLACE: {
            return {
                ...state,
                love: state.love.filter((place: Place) => place.id !== action.payload)
            }
        }
        case SET_LOVED_PLACES: {
            return {
                ...state,
                love: action.payload
            }
        }
        default:
            return state;
    }
};
