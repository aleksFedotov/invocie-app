import {
  fireEvent,
  render,
  screen,
  act,
  waitFor,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import store from '../../../store/store';

import Auth from '../Auth';

const mockComponent = () => {
  return (
    <Provider store={store}>
      <Auth />
    </Provider>
  );
};

describe('Auth component testing', () => {
  test('should render component', () => {
    render(mockComponent());
    const header = screen.getByRole('heading', { level: 1 });
    expect(header).toHaveTextContent(/Sign Up/i);
  });

  test('should change header to "Login" and swither to "singin" after clicking on switcher "login"', async () => {
    render(mockComponent());
    const switcher = screen.getByTestId('switcher');

    fireEvent.click(switcher);
    const header = screen.getByRole('heading', { level: 1 });

    expect(header).toHaveTextContent(/login/i);
    expect(switcher).toHaveTextContent(/sing up/i);
  });
  test('should change header to "Sing up" and swither to "singin" after clicking on switcher "sing up"', async () => {
    render(mockComponent());
    const switcher = screen.getByTestId('switcher');
    fireEvent.click(switcher);
    fireEvent.click(switcher);
    const header = screen.getByRole('heading', { level: 1 });
    expect(header).toHaveTextContent(/Sign up/i);
    expect(switcher).toHaveTextContent(/login/i);
  });

  test('should change value in password after typing', () => {
    render(mockComponent());
    const emailInput = screen.getByLabelText('email');
    fireEvent.change(emailInput, { target: { value: 'test@test.com' } });
    expect(emailInput).toHaveValue('test@test.com');
  });
  test('should change value in password after typing', () => {
    render(mockComponent());
    const passwordInput = screen.getByLabelText('password');
    fireEvent.change(passwordInput, { target: { value: '123456' } });
    expect(passwordInput).toHaveValue('123456');
  });
  test('should change value in password after typing', () => {
    render(mockComponent());
    const repeatPasswordInput = screen.getByLabelText('passwordConfirmation');
    fireEvent.change(repeatPasswordInput, { target: { value: '123456' } });
    expect(repeatPasswordInput).toHaveValue('123456');
  });
  test('should pass validation with right data', async () => {
    render(mockComponent());
    const emailInput = screen.getByLabelText('email');
    fireEvent.change(emailInput, { target: { value: 'test@test.com' } });
    const passwordInput = screen.getByLabelText('password');
    fireEvent.change(passwordInput, { target: { value: '123456' } });
    const repeatPasswordInput = screen.getByLabelText('passwordConfirmation');
    fireEvent.change(repeatPasswordInput, { target: { value: '123456' } });
    const btn = screen.getByRole('button');
    await act(() => {
      fireEvent.click(btn);
    });

    await waitFor(() => {
      const errors = screen.queryAllByRole('alert');
      expect(errors).toHaveLength(0);
    });
  });
  test('should not pass validation with wrong data', async () => {
    render(mockComponent());
    const emailInput = screen.getByLabelText('email');
    fireEvent.change(emailInput, { target: { value: 'test.com' } });
    const passwordInput = screen.getByLabelText('password');
    fireEvent.change(passwordInput, { target: { value: '1234' } });
    const repeatPasswordInput = screen.getByLabelText('passwordConfirmation');
    fireEvent.change(repeatPasswordInput, { target: { value: '' } });
    const btn = screen.getByRole('button');
    await act(() => {
      fireEvent.click(btn);
    });

    await waitFor(() => {
      const errors = screen.queryAllByRole('alert');
      expect(errors).toHaveLength(3);
    });
  });
});
