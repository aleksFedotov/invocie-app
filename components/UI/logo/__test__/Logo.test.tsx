import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Logo from '../Logo';

describe('Logo component testing', () => {
  test('should render component', () => {
    render(<Logo />);
    const logoImg = screen.getByAltText('logo');
    expect(logoImg).toBeInTheDocument();
  });
});
