import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import InvocesLitsItem from '../InvoicesListItem';
import { useRouter } from 'next/router';
import { act } from 'react-dom/test-utils';

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

jest.mock('next/router', () => ({
  ...jest.requireActual('next/router'),
  useRouter: jest.fn(),
}));

window.resizeTo = function resizeTo(width, height) {
  Object.assign(this, {
    innerWidth: width,
    innerHeight: height,
    outerWidth: width,
    outerHeight: height,
  }).dispatchEvent(new this.Event('resize'));
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
    expect(totalPrice).toHaveTextContent(/£1,800.90/i);
  });
  test('should have paid status', () => {
    render(<InvocesLitsItem data={data} />);
    const status = screen.getByText(/paid/i);
    expect(status).toBeInTheDocument();
  });

  test('clicking on item should call router.push', () => {
    const push = jest.fn();
    // @ts-ignore
    useRouter.mockImplementation(() => ({ push }));
    render(<InvocesLitsItem data={data} />);
    const listitem = screen.getByTestId('invoice');
    fireEvent.click(listitem);
    expect(push).toBeCalledWith('/invoice/RT3080');
  });

  test('should render arrow icon when window size is greater than 700', () => {
    render(<InvocesLitsItem data={data} />);
    act(() => window.resizeTo(1440, 900));
    const arrowIcon = screen.queryByRole('img');
    expect(arrowIcon).toBeInTheDocument();
  });
  test('should not render arrow icon when window size is less than 700', () => {
    render(<InvocesLitsItem data={data} />);
    act(() => window.resizeTo(650, 650));
    const arrowIcon = screen.queryByRole('img');
    expect(arrowIcon).not.toBeInTheDocument();
  });

  test('left side of item should render client name when window size is greater than 700', () => {
    render(<InvocesLitsItem data={data} />);
    act(() => window.resizeTo(1440, 900));
    const leftSide = screen.getByTestId('item-left');
    expect(leftSide).toHaveTextContent(/Jensen Huang/i);
  });
  test('left side of item should render total when window size is less than 700', () => {
    render(<InvocesLitsItem data={data} />);
    act(() => window.resizeTo(650, 650));
    const leftSide = screen.getByTestId('item-left');
    expect(leftSide).toHaveTextContent(/£1,800.90/i);
  });
  test('right side of item should render total when window size is greater than 700', () => {
    render(<InvocesLitsItem data={data} />);
    act(() => window.resizeTo(1440, 900));
    const rightSide = screen.getByTestId('item-right');
    expect(rightSide).toHaveTextContent(/£1,800.90/i);
  });
  test('right side of item should render cllient name when window size is less than 700', () => {
    render(<InvocesLitsItem data={data} />);
    act(() => window.resizeTo(650, 650));
    const rightSide = screen.getByTestId('item-right');
    expect(rightSide).toHaveTextContent(/Jensen Huang/i);
  });
});
