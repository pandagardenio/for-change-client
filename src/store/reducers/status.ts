import { PlaceType } from '../../sdk/models';
import { SET_PLACE_FILTERS, StatusAction, SET_SHOW_ONLY_LOVED_PLACES } from '../actions/status';

export interface StatusState {
    placesFilters: Record<PlaceType, boolean>;
    showOnlyLovedPlaces: boolean;
}

export const initialState: StatusState = {
    placesFilters: {
        [PlaceType.ACCOMMODATION]: true,
        [PlaceType.CAFE]: true,
        [PlaceType.CLOTHING]: true,
        [PlaceType.COMMUNITY]: true,
        [PlaceType.COSMETICS]: true,
        [PlaceType.EVENT]: true,
        [PlaceType.FARMING]: true,
        [PlaceType.GROCERIES]: true,
        [PlaceType.HOUSING]: true,
        [PlaceType.PROJECTS]: true,
        [PlaceType.SHOPPING]: true,
        [PlaceType.URBAN_GARDEN]: true,
        [PlaceType.WINE_CELLAR]: true
    },
    showOnlyLovedPlaces: false
};

export const reducer = (state: StatusState = initialState, action: StatusAction): StatusState => {
    switch (action.type) {
        case SET_PLACE_FILTERS: {
            return {
                ...state,
                placesFilters: action.payload
            };
        }
        case SET_SHOW_ONLY_LOVED_PLACES: {
            return {
                ...state,
                showOnlyLovedPlaces: action.payload
            }
        }
        default:
            return state;
    }
};
