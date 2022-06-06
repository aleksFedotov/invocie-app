import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import InvoiceViewContent from '../InvoiceViewContent';
import { act } from 'react-dom/test-utils';

const testData = {
  id: 'XM9141',
  createdAt: '2021-08-21',
  paymentDue: '2021-09-20',
  description: 'Graphic Design',
  paymentTerms: 30,
  clientName: 'Alex Grim',
  clientEmail: 'alexgrim@mail.com',
  status: 'pending',
  senderAddress: {
    street: '19 Union Terrace',
    city: 'London',
    postCode: 'E1 3EZ',
    country: 'United Kingdom',
  },
  clientAddress: {
    street: '84 Church Way',
    city: 'Bradford',
    postCode: 'BD1 9PB',
    country: 'USA',
  },
  items: [
    {
      name: 'Banner Design',
      quantity: 1,
      price: 156.0,
      total: 156.0,
    },
    {
      name: 'Email Design',
      quantity: 2,
      price: 200.0,
      total: 400.0,
    },
  ],
  total: 556.0,
};

window.resizeTo = function resizeTo(width, height) {
  Object.assign(this, {
    innerWidth: width,
    innerHeight: height,
    outerWidth: width,
    outerHeight: height,
  }).dispatchEvent(new this.Event('resize'));
};

describe('InvoiceViewMain component testing', () => {
  test('should render componnet', () => {
    render(<InvoiceViewContent data={testData} />);
    const amount = screen.queryByText(/Amount Due/i);
    expect(amount).toBeInTheDocument();
  });
  test('should have id', () => {
    render(<InvoiceViewContent data={testData} />);
    const id = screen.queryByText(/XM9141/i);
    expect(id).toBeInTheDocument();
  });
  test('should have description', () => {
    render(<InvoiceViewContent data={testData} />);
    const description = screen.queryByText(/Graphic Design/i);
    expect(description).toBeInTheDocument();
  });
  test('should have invoice date', () => {
    render(<InvoiceViewContent data={testData} />);
    const invoicdeDate = screen.queryByText(/21 Aug 2021/i);
    expect(invoicdeDate).toBeInTheDocument();
  });
  test('should have due date', () => {
    render(<InvoiceViewContent data={testData} />);
    const dueDate = screen.queryByText(/20 Sep 2021/i);
    expect(dueDate).toBeInTheDocument();
  });
  test('should have client name', () => {
    render(<InvoiceViewContent data={testData} />);
    const clientName = screen.queryByText(/Alex Grim/i);
    expect(clientName).toBeInTheDocument();
  });
  test('should have email', () => {
    render(<InvoiceViewContent data={testData} />);
    const email = screen.queryByText(/alexgrim@mail.com/i);
    expect(email).toBeInTheDocument();
  });

  test('should have sender street', () => {
    render(<InvoiceViewContent data={testData} />);
    const street = screen.queryByText(/19 Union Terrace/i);
    expect(street).toBeInTheDocument();
  });
  test('should have sender city', () => {
    render(<InvoiceViewContent data={testData} />);
    const city = screen.queryByText(/London/i);
    expect(city).toBeInTheDocument();
  });
  test('should have sender postCode', () => {
    render(<InvoiceViewContent data={testData} />);
    const postCode = screen.queryByText(/E1 3EZ/i);
    expect(postCode).toBeInTheDocument();
  });
  test('should have sender country', () => {
    render(<InvoiceViewContent data={testData} />);
    const country = screen.queryByText(/United Kingdom/i);
    expect(country).toBeInTheDocument();
  });

  test('should have client street', () => {
    render(<InvoiceViewContent data={testData} />);
    const street = screen.queryByText(/84 Church Way/i);
    expect(street).toBeInTheDocument();
  });
  test('should have client city', () => {
    render(<InvoiceViewContent data={testData} />);
    const city = screen.queryByText(/Bradford/i);
    expect(city).toBeInTheDocument();
  });
  test('should have client postCode', () => {
    render(<InvoiceViewContent data={testData} />);
    const postCode = screen.queryByText(/BD1 9PB/i);
    expect(postCode).toBeInTheDocument();
  });
  test('should have client country', () => {
    render(<InvoiceViewContent data={testData} />);
    const country = screen.queryByText(/USA/i);
    expect(country).toBeInTheDocument();
  });

  test('Bill to data container should have margin 11rem when widow size greater when 750', () => {
    render(<InvoiceViewContent data={testData} />);
    act(() => window.resizeTo(1440, 900));
    const container = screen.getByTestId('bill-to');
    expect(container).toHaveStyle('margin-right: 11rem');
  });
  test('Bill to data container should have margin 6rem when widow size less when 750', () => {
    render(<InvoiceViewContent data={testData} />);
    act(() => window.resizeTo(650, 650));
    const container = screen.getByTestId('bill-to');
    expect(container).toHaveStyle('margin-right: 6rem');
  });
});
