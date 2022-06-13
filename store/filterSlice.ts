import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { AppState } from './store';

export interface IFilterInitialState {
  appliedFilters: string[];
}

const initialState: IFilterInitialState = {
  appliedFilters: [],
};

export const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setFitlers(state, action: PayloadAction<string>) {
      const filter = action.payload.toLowerCase();
      if (state.appliedFilters.includes(filter)) {
        state.appliedFilters = state.appliedFilters.filter(
          (appliedFilter) => appliedFilter !== filter
        );
      } else {
        state.appliedFilters.push(filter);
      }
    },
  },
});

export const { setFitlers } = filtersSlice.actions;
export const selectFilters = (state: AppState) => state.filter.appliedFilters;

export const filterReducer = filtersSlice.reducer;
