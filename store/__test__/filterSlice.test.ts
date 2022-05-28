import store from '../store';
import { setFitlers } from '../filterSlice';

describe('filterSlice testing', () => {
  test('should have empty filters array initialy', () => {
    const filters = store.getState().filter.appliedFilters;
    expect(filters).toHaveLength(0);
  });
  test("should add filter 'paid' to filters array", () => {
    store.dispatch(setFitlers('paid'));
    const filters = store.getState().filter.appliedFilters;
    expect(filters.includes('paid')).toBeTruthy();
  });

  test("should remove filter 'paid' after second click", () => {
    store.dispatch(setFitlers('paid'));
    const filters = store.getState().filter.appliedFilters;
    expect(filters.includes('paid')).toBeFalsy();
  });
});
