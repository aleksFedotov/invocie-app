import { configureStore } from '@reduxjs/toolkit';
import { filterReducer } from './filterSlice';
import { modalReducer } from './modalSlice';
import { authReducer } from './authSlice';
import { demoReducer } from './demoSlice';
import { createWrapper } from 'next-redux-wrapper';

import {
  nextReduxCookieMiddleware,
  wrapMakeStore,
} from 'next-redux-cookie-wrapper';

const makeStore = wrapMakeStore(() =>
  configureStore({
    reducer: {
      filter: filterReducer,
      modal: modalReducer,
      auth: authReducer,
      demo: demoReducer,
    },
    // preloadedState: reHydrateStore(),
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().prepend(
        nextReduxCookieMiddleware({
          subtrees: [{ subtree: 'demo', cookieName: 'demo' }],
        })
      ),
  })
);

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export const wrapper = createWrapper<AppStore>(makeStore, { debug: true });
