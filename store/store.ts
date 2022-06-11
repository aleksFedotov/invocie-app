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
  persistStore,
} from 'redux-persist';

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

// MIDDLEWARE;
const demoMiddleware: Middleware = (store) => (next) => (action) => {
  const { demo } = store.getState();
  const storageData = localStorage.getItem('demo');
  console.log(demoActions);
  console.log(action);
  console.log(demoActions.hasOwnProperty(action));
  if (demoActions.loginDemo.match(action) && storageData === null) {
    localStorage.setItem(
      'demo',
      JSON.stringify({ isDemoMode: true, invoices: data })
    );
  }
  if (demo.isDemoMode) {
    localStorage.setItem('demo', JSON.stringify(demo));
  }
  next(action);
};

// Rehydration function

// const reHydrateStore = () => {
//   if (localStorage.getItem('demo') !== null) {
//     return JSON.parse(localStorage.getItem('demo')); // re-hydrate the store
//   }
// };

// const reducers = combineReducers({
//   filter: filterReducer,
//   modal: modalReducer,
//   auth: authReducer,
//   demo: demoReducer,
// });

// const persistConfig = {
//   key: 'root',
//   storage,
//   whitelist: ['demo'],
// };

// const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: {
    filter: filterReducer,
    modal: modalReducer,
    auth: authReducer,
    demo: demoReducer,
  },
  // preloadedState: reHydrateStore(),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(demoMiddleware),
});

export default store;
