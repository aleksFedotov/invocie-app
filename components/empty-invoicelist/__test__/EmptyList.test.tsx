import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import EmptyList from '../EmptyList';

describe('EmptyList component testing', () => {
  test('should render component', () => {
    render(<EmptyList />);
    const text = screen.getByText(/there is nothing here/i);
    expect(text).toBeInTheDocument();
  });

  test('should have img', () => {
    render(<EmptyList />);
    const img = screen.getByAltText(/empty-list/i);
    expect(img).toBeInTheDocument();
  });
});
