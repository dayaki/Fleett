import AsyncStorage from '@react-native-async-storage/async-storage';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { persistReducer, persistStore, createTransform } from 'redux-persist';
import JSOG from 'jsog';
import logger from 'redux-logger';
import rootReducer from './reducers';

/* eslint-disable no-unused-vars */
export const JSOGTransform = createTransform(
  (inboundState, _key) => JSOG.encode(inboundState),
  (outboundState, _key) => JSOG.decode(outboundState),
);

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  transforms: [JSOGTransform],
  whitelist: ['user'],
};

const middleware = [ReduxThunk, logger];

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, {}, applyMiddleware(...middleware));

const persistor = persistStore(store);

export { persistor, store };
