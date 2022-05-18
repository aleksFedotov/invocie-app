import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import store from '../../../../store/store';

import InvoicesHeader from '../InvoicesHeader';

const mockComponent = (total: number) => {
  return (
    <Provider store={store}>
      <InvoicesHeader total={total} />
    </Provider>
  );
};

describe('InvoceHeader component testing', () => {
  test('should render component', () => {
    render(mockComponent(7));
    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();
  });

  test('should render "Invoices" h1 heading', () => {
    render(mockComponent(7));
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent(/invoices/i);
  });

  test('should have paragraph with right number of ivoices', () => {
    render(mockComponent(7));
    const text = screen.getByText(/There are 7 total Invoices/i);
    expect(text).toBeInTheDocument();
  });

  test('should have filter', () => {
    render(mockComponent(7));
    const fitler = screen.getByText(/Filter by status/i);
    expect(fitler).toBeInTheDocument();
  });

  test('should have "new invoice" button', () => {
    render(mockComponent(7));
    const button = screen.getByText(/new invoice/i);
    expect(button).toBeInTheDocument();
  });

  test('should not have drop filter menu initialy', () => {
    render(mockComponent(7));
    const filters = screen.queryByTestId('filters');
    expect(filters).toBeNull();
  });

  test('should render filter menu after click', async () => {
    render(mockComponent(7));
    const fitlerMenu = screen.getByText(/Filter by status/i);
    fireEvent.click(fitlerMenu);
    const filters = await screen.findByTestId('filters');
    expect(filters).toBeInTheDocument();
  });
});
