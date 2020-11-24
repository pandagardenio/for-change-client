import localForage from 'localforage';
import { persistCombineReducers } from 'redux-persist';
import { PlacesAction } from '../actions';

import { PlacesState, initialState as PlacesInitialState, reducer as placesReducer } from './places';

export type AppState = {
    places: PlacesState;
}

export const initialState: AppState = {
    places: PlacesInitialState
};

export type AppAction = PlacesAction;

const persistConfig = {
    key: 'root',
    storage: localForage,
    whitelist: ['places']
};

const rootReducer = persistCombineReducers<AppState>(persistConfig, {
    // @ts-ignore
    places: placesReducer
});

export default rootReducer;
