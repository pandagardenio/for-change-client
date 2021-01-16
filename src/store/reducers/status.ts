import { PlaceType } from '../../sdk/models';
import { SET_PLACE_FILTERS, StatusAction, SET_SHOW_ONLY_LOVED_PLACES, SET_MAP_CENTER, SET_MAP_ZOOM, SET_MAP, TOGGLE_PLACES_FILTERS } from '../actions/status';

export type MapStatusState = {
    center: [number, number];
    zoom: number;
}

export type StatusState = {
    map: MapStatusState;
    placesFilters: Record<PlaceType, boolean>;
    showPlacesFilters: boolean,
    showOnlyLovedPlaces: boolean;
}

export const initialState: StatusState = {
    map: {
        center: [40.385063, -3.700218],
        zoom: 6
    },
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
