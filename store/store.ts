import { configureStore } from '@reduxjs/toolkit';
import { filterReducer } from './filterSlice';
import { modalReducer } from './modalSlice';
import { authReducer } from './authSlice';
import { demoReducer } from './demoSlice';
import { Middleware, combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import { demoActions } from './demoSlice';
import data from '../data.json';

import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

const reducers = combineReducers({
  filter: filterReducer,
  modal: modalReducer,
  auth: authReducer,
  demo: demoReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['demo'],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, PAUSE, PURGE, REHYDRATE, REGISTER, PERSIST],
      },
    }),
});

export default store;
