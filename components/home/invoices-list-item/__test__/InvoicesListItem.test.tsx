import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import InvocesLitsItem from '../InvoicesListItem';

const data = {
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

describe('InvoicesListItem testing', () => {
  test('should render component', () => {
    render(<InvocesLitsItem data={data} />);
    const listitem = screen.getByTestId('invoice');
    expect(listitem).toBeInTheDocument();
  });
  test('should have id', () => {
    render(<InvocesLitsItem data={data} />);
    const id = screen.getByRole('heading', { level: 3 });
    expect(id).toHaveTextContent(/RT3080/i);
  });
  test('should have due date', () => {
    render(<InvocesLitsItem data={data} />);
    const dueDAte = screen.getByText(/Due 19 Aug 2021/i);
    expect(dueDAte).toBeInTheDocument();
  });
  test('should have client name', () => {
    render(<InvocesLitsItem data={data} />);
    const clientName = screen.getByText(/Jensen Huang/i);
    expect(clientName).toBeInTheDocument();
  });
  test('should have total price', () => {
    render(<InvocesLitsItem data={data} />);
    const totalPrice = screen.getByRole('heading', { level: 2 });
    expect(totalPrice).toHaveTextContent(/£ 1,800.90/i);
  });
  test('should have paid status', () => {
    render(<InvocesLitsItem data={data} />);
    const status = screen.getByText(/paid/i);
    expect(status).toBeInTheDocument();
  });
});
