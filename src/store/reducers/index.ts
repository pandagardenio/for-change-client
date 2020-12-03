import localForage from 'localforage';
import { persistCombineReducers } from 'redux-persist';
import { PlacesAction } from '../actions';

import {
    PlacesState,
    initialState as placesInitialState,
    reducer as placesReducer
} from './places';
import {
    StatusState,
    initialState as statusInitialState,
    reducer as statusReducer
} from './status';

export type AppState = {
    places: PlacesState;
    status: StatusState
}

export const initialState: AppState = {
    places: placesInitialState,
    status: statusInitialState
};

export type AppAction = PlacesAction;

const persistConfig = {
    key: 'root',
    storage: localForage,
    whitelist: ['places']
};

const rootReducer = persistCombineReducers<AppState>(persistConfig, {
    // @ts-ignore
    places: placesReducer,
    // @ts-ignore
    status: statusReducer
});

export default rootReducer;
