import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import HomeLink from '../HomeLink';

describe('HomeLink testing', () => {
  test('should render component', () => {
    render(<HomeLink />);
    const link = screen.queryByText(/go back/i);
    screen.debug();
    expect(link).toBeInTheDocument();
  });
});
