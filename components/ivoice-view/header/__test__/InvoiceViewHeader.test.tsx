import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import store from '../../../../store/store';

import InvoiceViewHeader from '../InvoiceViewHeader';

const testData = {
  id: 'RT3080',
  createdAt: '2021-08-18',
  paymentDue: '2021-08-19',
  description: 'Re-branding',
  paymentTerms: 1,
  clientName: 'Jensen Huang',
  clientEmail: 'jensenh@mail.com',
  status: 'paid',
  senderAddress: {
    street: '19 Union Terrace',
    city: 'London',
    postCode: 'E1 3EZ',
    country: 'United Kingdom',
  },
  clientAddress: {
    street: '106 Kendell Street',
    city: 'Sharrington',
    postCode: 'NR24 5WQ',
    country: 'United Kingdom',
  },
  items: [
    {
      name: 'Brand Guidelines',
      quantity: 1,
      price: 1800.9,
      total: 1800.9,
    },
  ],
  total: 1800.9,
};

const mockComponent = () => {
  return (
    <Provider store={store}>
      <InvoiceViewHeader data={testData} />
    </Provider>
  );
};

describe('InvoiceViewHeader componetn testing', () => {
  test('should render componnet', () => {
    render(mockComponent());
    const id = screen.queryByText(/status/i);
    expect(id).toBeInTheDocument();
  });

  test('should have status paid', () => {
    render(mockComponent());
    const status = screen.queryByText('paid');
    expect(status).toBeInTheDocument();
  });
});
