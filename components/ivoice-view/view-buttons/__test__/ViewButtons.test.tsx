import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import store from '../../../../store/store';
import { useAppDispatch } from '../../../../store/hooks';
import { useRouter } from 'next/router';

import ViewButtons from '../ViewButtons';
import { act } from 'react-dom/test-utils';

jest.mock('../../../../store/hooks', () => ({
  ...jest.requireActual('../../../../store/hooks'),
  useAppDispatch: jest.fn(),
}));

jest.mock('next/router', () => ({
  ...jest.requireActual('next/router'),
  useRouter: jest.fn(),
}));

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
    const mainBtn = screen.getByRole('button', { name: /Mark as Paid/i });
    expect(mainBtn).toHaveClass('main_btn');
  });

  test('should call dispatch after clicking edit', () => {
    const dispatch = jest.fn();
    // @ts-ignore
    useAppDispatch.mockReturnValue(dispatch);
    render(mockComponent());
    const editBtn = screen.getByRole('button', { name: /edit/i });
    fireEvent.click(editBtn);
    expect(dispatch).toBeCalled();
  });
  test('should call dispatch after clicking delete', () => {
    const dispatch = jest.fn();
    // @ts-ignore
    useAppDispatch.mockReturnValue(dispatch);
    render(mockComponent());
    const deletetBtn = screen.getByRole('button', { name: /delete/i });
    fireEvent.click(deletetBtn);
    expect(dispatch).toBeCalled();
  });
  test('should call router.replace after clicking mark as paid', async () => {
    const replace = jest.fn();
    // @ts-ignore
    useRouter.mockImplementation(() => ({
      replace,
    }));
    render(mockComponent());
    const paidBtn = screen.getByRole('button', { name: /mark as paid/i });
    await act(() => {
      fireEvent.click(paidBtn);
    });
    await waitFor(() => {
      expect(replace).toBeCalled();
    });
  });
});
