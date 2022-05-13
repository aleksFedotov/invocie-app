import { configureStore } from '@reduxjs/toolkit';
import { filterReducer } from './filterSlice';

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

const store = configureStore({ reducer: { filter: filterReducer } });

export default store;
