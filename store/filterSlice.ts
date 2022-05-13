import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';

export interface IFitlers {
  draft: boolean;
  pending: boolean;
  paid: boolean;
}

interface IInitialState {
  filters: IFitlers;
}

const initialState: IInitialState = {
  filters: {
    draft: false,
    pending: false,
    paid: false,
  },
};

export const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setFitlers(state, action: PayloadAction<string>) {
      const filter = action.payload;
      state.filters[filter as keyof IFitlers] =
        !state.filters[filter as keyof IFitlers];
    },
  },
});

export const { setFitlers } = filtersSlice.actions;
export const selectFilters = (state: RootState) => state.filter.filters;

export const filterReducer = filtersSlice.reducer;
