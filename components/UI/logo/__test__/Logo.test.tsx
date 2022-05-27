import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import store from '../../../../store/store';
import Logo from '../Logo';

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
});
