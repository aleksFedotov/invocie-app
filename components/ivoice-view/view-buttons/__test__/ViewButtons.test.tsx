import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import store from '../../../../store/store';

import ViewButtons from '../ViewButtons';

const mockComponent = () => {
  return (
    <Provider store={store}>
      <ViewButtons isMobile={false} />
    </Provider>
  );
};

describe('ViewButtons componetn testing', () => {
  test('should render 3 buttons', () => {
    render(mockComponent());
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(3);
  });

  test('should render edit btn', () => {
    render(mockComponent());
    const editBtn = screen.getByRole('button', { name: /edit/i });
    expect(editBtn).toHaveClass('edit_btn');
  });

  test('should render delete btn', () => {
    render(mockComponent());
    const deleteBtn = screen.getByRole('button', { name: /delete/i });
    expect(deleteBtn).toHaveClass('delete_btn');
  });

  test('should render main btn', () => {
    render(mockComponent());
    const mainBtn = screen.getByRole('button', { name: /Mark as Read/i });
    expect(mainBtn).toHaveClass('main_btn');
  });
});
