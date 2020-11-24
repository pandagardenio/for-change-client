import { applyMiddleware, createStore } from 'redux';
import { persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

import rootReducer from './reducers';

const middleWare = applyMiddleware(thunk);

export const store = createStore(rootReducer, middleWare);

export const persistor = persistStore(store);
