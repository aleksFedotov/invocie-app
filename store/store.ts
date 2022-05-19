import { configureStore } from '@reduxjs/toolkit';
import { filterReducer } from './filterSlice';
import { modalReducer } from './modalSlice';

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

const store = configureStore({
  reducer: { filter: filterReducer, modal: modalReducer },
});

export default store;
