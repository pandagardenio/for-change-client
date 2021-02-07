import { PlaceCategorySlug } from '../../sdk/models';
import { SET_PLACE_FILTERS, StatusAction, SET_SHOW_ONLY_LOVED_PLACES, SET_MAP_CENTER, SET_MAP_ZOOM, SET_MAP, TOGGLE_PLACES_FILTERS, SET_PLACE_FILTER, LIGHT_PLACE_FILTER } from '../actions/status';

export type MapStatusState = {
    center: [number, number];
    zoom: number;
}

export type StatusState = {
    map: MapStatusState;
    placesFilters: Record<PlaceCategorySlug, boolean>;
    showPlacesFilters: boolean,
    showOnlyLovedPlaces: boolean;
}

export const initialState: StatusState = {
    map: {
        center: [40.385063, -3.700218],
        zoom: 6
    },
    placesFilters: {
        [PlaceCategorySlug.ACCOMMODATION]: true,
        [PlaceCategorySlug.CAFE]: true,
        [PlaceCategorySlug.CLOTHING]: true,
        [PlaceCategorySlug.COMMUNITY]: true,
        [PlaceCategorySlug.COSMETICS]: true,
        [PlaceCategorySlug.EVENT]: true,
        [PlaceCategorySlug.FARMING]: true,
        [PlaceCategorySlug.GROCERIES]: true,
        [PlaceCategorySlug.HOUSING]: true,
        [PlaceCategorySlug.PROJECTS]: true,
        [PlaceCategorySlug.SHOPPING]: true,
        [PlaceCategorySlug.URBAN_GARDEN]: true,
        [PlaceCategorySlug.WINE_CELLAR]: true
    },
    showPlacesFilters: false,
    showOnlyLovedPlaces: false
};

export const reducer = (state: StatusState = initialState, action: StatusAction): StatusState => {
    switch (action.type) {
        case LIGHT_PLACE_FILTER: {
            return {
                ...state,
                placesFilters: {
                    [PlaceCategorySlug.ACCOMMODATION]: false,
                    [PlaceCategorySlug.CAFE]: false,
                    [PlaceCategorySlug.CLOTHING]: false,
                    [PlaceCategorySlug.COMMUNITY]: false,
                    [PlaceCategorySlug.COSMETICS]: false,
                    [PlaceCategorySlug.EVENT]: false,
                    [PlaceCategorySlug.FARMING]: false,
                    [PlaceCategorySlug.GROCERIES]: false,
                    [PlaceCategorySlug.HOUSING]: false,
                    [PlaceCategorySlug.PROJECTS]: false,
                    [PlaceCategorySlug.SHOPPING]: false,
                    [PlaceCategorySlug.URBAN_GARDEN]: false,
                    [PlaceCategorySlug.WINE_CELLAR]: false,
                    [action.payload]: true
                }
            };
        }
        case SET_PLACE_FILTERS: {
            return {
                ...state,
                placesFilters: action.payload
            };
        }
        case SET_PLACE_FILTER: {
            return {
                ...state,
                placesFilters: {
                    ...state.placesFilters,
                    ...action.payload
                }
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
