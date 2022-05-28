import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import store from '../../../../store/store';
import Logo from '../Logo';
import { act } from 'react-dom/test-utils';
import { RouterContext } from 'next/dist/shared/lib/router-context';
import { createMockRouter } from '../../../../test-utils/createMockRouter';

window.resizeTo = function resizeTo(width, height) {
  Object.assign(this, {
    innerWidth: width,
    innerHeight: height,
    outerWidth: width,
    outerHeight: height,
  }).dispatchEvent(new this.Event('resize'));
};

describe('Logo component testing', () => {
  test('should render component', () => {
    render(
      <Provider store={store}>
        <Logo />
      </Provider>
    );
    const logoImg = screen.getByAltText('logo');
    expect(logoImg).toBeInTheDocument();
  });
  test('should have right size 40 initialy', () => {
    render(
      <Provider store={store}>
        <Logo />
      </Provider>
    );
    const avatarImg = screen.getByRole('img');

    expect(avatarImg).toHaveAttribute('data-size', '40');
  });
  test('should have right size 32 with screen widhth below 800px', () => {
    const { rerender } = render(
      <Provider store={store}>
        <Logo />
      </Provider>
    );
    const avatarImg = screen.getByRole('img');

    act(() => {
      window.resizeTo(700, 700);
    });

    render(
      <Provider store={store}>
        <Logo />
      </Provider>
    );

    expect(avatarImg).toHaveAttribute('data-size', '32');
  });
  test('should have right size 28 with screen widhth below 600px', () => {
    const { rerender } = render(
      <Provider store={store}>
        <Logo />
      </Provider>
    );
    const avatarImg = screen.getByRole('img');

    act(() => {
      window.resizeTo(600, 600);
    });

    rerender(
      <Provider store={store}>
        <Logo />
      </Provider>
    );

    expect(avatarImg).toHaveAttribute('data-size', '28');
  });

  test('should be clickable', () => {
    render(
      <Provider store={store}>
        <RouterContext.Provider value={createMockRouter({ pathname: '/' })}>
          <Logo />
        </RouterContext.Provider>
      </Provider>
    );
    const logo = screen.getByAltText('logo');
    fireEvent.click(logo);
  });
});
