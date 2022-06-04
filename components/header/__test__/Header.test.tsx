import {
  fireEvent,
  render,
  screen,
  waitFor,
  act,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import store from '../../../store/store';

import Header from '../Header';

const themeHandler = jest.fn();

const mockHeader = (theme: string) => {
  return (
    <Provider store={store}>
      <Header themeHandler={themeHandler} theme={theme} />
    </Provider>
  );
};

describe('Header compotent testting', () => {
  test('should render component', () => {
    render(mockHeader('light'));
    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();
  });

  test('component should have logo', () => {
    render(mockHeader('light'));
    const logo = screen.getByAltText('logo');
    expect(logo).toBeInTheDocument();
  });

  test('component should have theme button', () => {
    render(mockHeader('light'));
    const themeBtn = screen.getByRole('button');
    expect(themeBtn).toBeInTheDocument();
  });

  test('butoon should have sun icon if it is light theme', () => {
    render(mockHeader('light'));
    const sunIcon = screen.getByTestId('sun');
    expect(sunIcon).toBeInTheDocument();
  });

  test('butoon should have moon icon if it is dark theme', () => {
    render(mockHeader('dark'));
    const moonIcon = screen.getByTestId('moon');
    expect(moonIcon).toBeInTheDocument();
  });

  test('component should have avatar', () => {
    render(mockHeader('light'));
    const avatar = screen.getByAltText('avatar');
    expect(avatar).toBeInTheDocument();
  });

  test('should callen onClick when icon is cliked', () => {
    render(mockHeader('light'));
    const sunIcon = screen.getByTestId('sun');
    fireEvent.click(sunIcon);
    expect(themeHandler).toBeCalled();
  });

  test('Should open sing up pop up after clicking on avatar', async () => {
    render(mockHeader('light'));
    const avatar = screen.getByAltText('avatar');
    act(() => {
      fireEvent.click(avatar);
    });

    await waitFor(() => {
      const btn = screen.queryByRole('button', { name: /sing up/i });
      expect(btn).toBeInTheDocument();
    });
  });
});
