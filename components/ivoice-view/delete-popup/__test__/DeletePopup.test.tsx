import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import store from '../../../../store/store';
import { useAppDispatch } from '../../../../store/hooks';
import * as hooks from '../../../../hooks/useHttp';
import * as nookies from 'nookies';
import { useRouter } from 'next/router';

import DeletePopup from '../DeletePopup';
import { act } from 'react-dom/test-utils';

const mockComponent = (id: string) => {
  return (
    <Provider store={store}>
      <DeletePopup id={id} />
    </Provider>
  );
};

jest.mock('../../../../store/hooks', () => ({
  ...jest.requireActual('../../../../store/hooks'),
  useAppDispatch: jest.fn(),
}));

jest.mock('next/router', () => ({
  ...jest.requireActual('../../../../store/hooks'),
  useRouter: jest.fn(),
}));

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

  test('should call sendRequest after clicking on delete', async () => {
    const push = jest.fn();
    // @ts-ignore

    useRouter.mockImplementation(() => ({ push }));
    const spyHook = jest.spyOn(hooks, 'default');
    spyHook.mockReturnValue({
      isLoading: false,
      error: false,
      sendRequest: jest.fn(),
    });
    const spyCookies = jest.spyOn(nookies, 'parseCookies');
    spyCookies.mockReturnValue({
      userData: '{}',
    });
    const dispatch = jest.fn();

    // @ts-ignore
    useAppDispatch.mockReturnValue(dispatch);
    render(mockComponent('#XM9141'));
    const deleteBtn = screen.getByRole('button', { name: /delete/i });
    await act(() => {
      fireEvent.click(deleteBtn);
    });
    await waitFor(() => {
      expect(push).toBeCalledWith('/', undefined, { shallow: true });
      expect(dispatch).toBeCalled();
    });
  });

  test('should call dispathc after cliking on cancel btn', () => {
    const dispatch = jest.fn();
    // @ts-ignore
    useAppDispatch.mockReturnValue(dispatch);
    render(mockComponent('#XM9141'));
    const cancelBtn = screen.getByRole('button', { name: /Cancel/i });
    fireEvent.click(cancelBtn);
    expect(dispatch).toBeCalled();
  });
});
