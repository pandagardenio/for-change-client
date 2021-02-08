import localForage from 'localforage';
import { persistCombineReducers } from 'redux-persist';
import { PlacesAction, SearchAction, StatusAction } from '../actions';

import {
    PlacesState,
    initialState as placesInitialState,
    reducer as placesReducer
} from './places';
import {
    SearchState,
    initialState as searchInitialState,
    reducer as searchReducer
} from './search';
import {
    StatusState,
    initialState as statusInitialState,
    reducer as statusReducer
} from './status';

export type AppState = {
    places: PlacesState;
    search: SearchState;
    status: StatusState;
}

export const initialState: AppState = {
    places: placesInitialState,
    search: searchInitialState,
    status: statusInitialState
};

export type AppAction = PlacesAction | SearchAction | StatusAction;

const persistConfig = {
    key: 'root',
    storage: localForage,
    whitelist: ['places.loved']
};

const rootReducer = persistCombineReducers<AppState, AppAction>(persistConfig, {
    // @ts-ignore
    places: placesReducer,
    // @ts-ignore
    search: searchReducer,
    // @ts-ignore
    status: statusReducer
});

export default rootReducer;
