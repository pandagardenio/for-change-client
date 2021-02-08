import { AppState } from "../reducers";

export const getSearchResult = (state: AppState) => state.search.searchResult;