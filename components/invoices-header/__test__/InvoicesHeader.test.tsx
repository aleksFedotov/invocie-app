import { fireEvent, render, screen } from '@testing-library/react';

import InvoicesHeader from '../InvoicesHeader';

describe('InvoceHeader component testing', () => {
  test('should render component', () => {
    render(<InvoicesHeader total={7} />);
    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();
  });

  test('should render "Invoices" h1 heading', () => {
    render(<InvoicesHeader total={7} />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent(/invoices/i);
  });

  test('should have paragraph with right number of ivoices', () => {
    render(<InvoicesHeader total={7} />);
    const text = screen.getByText(/There are 7 total Invoices/i);
    expect(text).toBeInTheDocument();
  });

  test('should have filter', () => {
    render(<InvoicesHeader total={7} />);
    const fitler = screen.getByText(/Filter by status/i);
    expect(fitler).toBeInTheDocument();
  });

  test('should have "new invoice" button', () => {
    render(<InvoicesHeader total={7} />);
    const button = screen.getByText(/new invoice/i);
    expect(button).toBeInTheDocument();
  });

  test('button should call function on click', () => {
    render(<InvoicesHeader total={7} />);
    const onClichHandler = jest.fn();
    const button = screen.getByText(/new invoice/i);
    fireEvent.click(button);
    expect(onClichHandler).toBeCalled();
  });

  test('should not have drop filter menu initialy', () => {
    render(<InvoicesHeader total={7} />);
    const filters = screen.getByTestId('filters');
    expect(filters).toBeNull();
  });

  test('should render filter menu after click', async () => {
    render(<InvoicesHeader total={7} />);
    const fitlerMenu = screen.getByText(/Filter by status/i);
    fireEvent.click(fitlerMenu);
    const filters = await screen.findByTestId('filters');
    expect(filters).toBeInTheDocument();
  });
});
