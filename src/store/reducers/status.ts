import { PlaceCategory } from '../../sdk/models';
import { SET_PLACE_FILTERS, StatusAction, SET_SHOW_ONLY_LOVED_PLACES, SET_MAP_CENTER, SET_MAP_ZOOM, SET_MAP, TOGGLE_PLACES_FILTERS } from '../actions/status';

export type MapStatusState = {
    center: [number, number];
    zoom: number;
}

export type StatusState = {
    map: MapStatusState;
    placesFilters: Record<PlaceCategory, boolean>;
    showPlacesFilters: boolean,
    showOnlyLovedPlaces: boolean;
}

export const initialState: StatusState = {
    map: {
        center: [40.385063, -3.700218],
        zoom: 6
    },
    placesFilters: {
        [PlaceCategory.ACCOMMODATION]: true,
        [PlaceCategory.CAFE]: true,
        [PlaceCategory.CLOTHING]: true,
        [PlaceCategory.COMMUNITY]: true,
        [PlaceCategory.COSMETICS]: true,
        [PlaceCategory.EVENT]: true,
        [PlaceCategory.FARMING]: true,
        [PlaceCategory.GROCERIES]: true,
        [PlaceCategory.HOUSING]: true,
        [PlaceCategory.PROJECTS]: true,
        [PlaceCategory.SHOPPING]: true,
        [PlaceCategory.URBAN_GARDEN]: true,
        [PlaceCategory.WINE_CELLAR]: true
    },
    showPlacesFilters: false,
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
        case TOGGLE_PLACES_FILTERS: {
            return {
                ...state,
                showPlacesFilters: !state.showPlacesFilters
            };
        }
        case SET_SHOW_ONLY_LOVED_PLACES: {
            return {
                ...state,
                showOnlyLovedPlaces: action.payload
            }
        }
        case SET_MAP: {
            return {
                ...state,
                map: action.payload
            }
        }
        case SET_MAP_CENTER: {
            return {
                ...state,
                map: {
                    ...state.map,
                    center: action.payload
                }
            }
        }
        case SET_MAP_ZOOM: {
            return {
                ...state,
                map: {
                    ...state.map,
                    zoom: action.payload
                }
            }
        }
        default:
            return state;
    }
};
