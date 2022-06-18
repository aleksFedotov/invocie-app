import { render, screen } from '@testing-library/react';

import Status from '../Status';

describe('Status component testing', () => {
  test('should render componnet', () => {
    render(<Status status="paid" />);
    const status = screen.getByText('paid');
    expect(status).toBeInTheDocument();
  });
});
