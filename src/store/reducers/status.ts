import { PlaceDimension } from '../../sdk/models';
import { SET_PLACE_DIMENSION, StatusAction } from '../actions/status';

export interface StatusState {
    placeDimension: PlaceDimension;
}

export const initialState: StatusState = {
    placeDimension: PlaceDimension.PHYSICAL
};

export const reducer = (state: StatusState = initialState, action: StatusAction): StatusState => {
    switch (action.type) {
        case SET_PLACE_DIMENSION: {
            return {
                ...state,
                placeDimension: action.payload
            }

        }
        default:
            return state;
    }
};
