import {
    SET_SEARCH_RESULT, SearchAction
} from '../actions/search';
import { SearchResult } from '../../pages/Search';

export type SearchState = {
    searchResult: SearchResult | null;
}

export const initialState: SearchState = {
    searchResult: null
};

export const reducer = (state: SearchState = initialState, action: SearchAction): SearchState => {
    switch (action.type) {
        case SET_SEARCH_RESULT: {
            return {
                ...state,
                searchResult: action.payload
            }

        }
        default:
            return state;
    }
};
