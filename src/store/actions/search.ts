import { SearchResult } from '../../pages/Search';

export const SET_SEARCH_RESULT = 'SET_SEARCH_RESULT';

export type SetSearchResultAction = {
    payload: SearchResult | null;
    type: typeof SET_SEARCH_RESULT;
};

export type SearchAction = SetSearchResultAction;

export const setSearchResult = (searchResult: SetSearchResultAction['payload']): SearchAction => ({
    payload: searchResult,
    type: SET_SEARCH_RESULT
})