import { getByText, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import store from '../../../../store/store';

import DeletePopup from '../DeletePopup';

const mockComponent = (id: string) => {
  return (
    <Provider store={store}>
      <DeletePopup id={id} />
    </Provider>
  );
};

describe('DeletePoupd component testing', () => {
  test('should render component', () => {
    render(mockComponent('#XM9141'));
    const header = screen.queryByText(/Confirm Deletion/i);
    expect(header).toBeInTheDocument();
  });
  test('should have invoice id', () => {
    render(mockComponent('#XM9141'));
    const id = screen.queryByText(/#XM9141/i);
    expect(id).toBeInTheDocument();
  });
  test('should have two buttons', () => {
    render(mockComponent('#XM9141'));
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(2);
  });
  test('should render delete btn', () => {
    render(mockComponent('#XM9141'));
    const deleteBtn = screen.getByRole('button', { name: /delete/i });
    expect(deleteBtn).toHaveClass('delete_btn');
  });

  test('should render main btn', () => {
    render(mockComponent('#XM9141'));
    const mainBtn = screen.getByRole('button', { name: /Cancel/i });
    expect(mainBtn).toHaveClass('cancel_btn');
  });
});
