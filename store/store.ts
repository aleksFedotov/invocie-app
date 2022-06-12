import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import { filterReducer } from './filterSlice';
import { modalReducer } from './modalSlice';
import { authReducer } from './authSlice';
import { demoReducer } from './demoSlice';
import { Middleware, combineReducers, Store } from 'redux';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import { demoActions } from './demoSlice';
import data from '../data.json';
import { createWrapper, MakeStore } from 'next-redux-wrapper';

import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistStore,
} from 'redux-persist';

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

// // MIDDLEWARE;
// const demoMiddleware: Middleware = (store) => (next) => (action) => {
//   const { demo } = store.getState();
//   const storageData = localStorage.getItem('demo');
//   console.log(demoActions);
//   console.log(action);
//   console.log(demoActions.hasOwnProperty(action));
//   if (demoActions.loginDemo.match(action) && storageData === null) {
//     localStorage.setItem(
//       'demo',
//       JSON.stringify({ isDemoMode: true, invoices: data })
//     );
//   }
//   if (demo.isDemoMode) {
//     localStorage.setItem('demo', JSON.stringify(demo));
//   }
//   next(action);
// };

// Rehydration function

// const reHydrateStore = () => {
//   if (localStorage.getItem('demo') !== null) {
//     return JSON.parse(localStorage.getItem('demo')); // re-hydrate the store
//   }
// };

const reducers = combineReducers({
  filter: filterReducer,
  modal: modalReducer,
  auth: authReducer,
  demo: demoReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  version: 1,
  whitelist: ['demo'],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  // preloadedState: reHydrateStore(),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const setupStore = (context: any): EnhancedStore => store;

const makeStore: MakeStore<any> = (context: any) => setupStore(context);

export const persistor = persistStore(store);

export const wrapper = createWrapper<Store>(makeStore);
