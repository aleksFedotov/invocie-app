import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import LoadingSpinner from '../LoadingSpinner';

describe('LoadingSpinner component testing', () => {
  test('should have class overalay if it pass as prop', () => {
    render(<LoadingSpinner asOverlay text="Loading" />);
    const spinner = screen.queryByTestId('spinner');

    expect(spinner).toHaveClass('overlay');
  });
  test('should not have class overalay if it not pass as prop', () => {
    render(<LoadingSpinner text="Loading" />);
    const spinner = screen.queryByTestId('spinner');
    expect(spinner).not.toHaveClass('overlay');
  });

  test('should render test Loading', () => {
    render(<LoadingSpinner asOverlay text="Loading" />);
    const text = screen.queryByText('Loading');
    expect(text).toBeInTheDocument();
  });
});
