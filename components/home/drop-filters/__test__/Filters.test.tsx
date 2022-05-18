import { render, screen, fireEvent } from '@testing-library/react';

import { Provider } from 'react-redux';
import store from '../../../../store/store';
import '@testing-library/jest-dom';

import Filters from '../Filters';

const mockFilterComponent = () => {
  return (
    <Provider store={store}>
      <Filters />
    </Provider>
  );
};

describe('Filters component testing', () => {
  test('should render component', () => {
    render(mockFilterComponent());
    const drop = screen.getByTestId('filters');
    expect(drop).toBeInTheDocument();
  });

  test('should render 3 inputs', () => {
    render(mockFilterComponent());
    const inputs = screen.getAllByTestId('checkbox');
    expect(inputs).toHaveLength(3);
  });
});
