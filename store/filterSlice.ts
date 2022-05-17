import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';

interface IInitialState {
  appliedFilters: string[];
}

const initialState: IInitialState = {
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
export const selectFilters = (state: RootState) => state.filter.appliedFilters;

export const filterReducer = filtersSlice.reducer;
