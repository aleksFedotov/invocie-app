import { getByRole, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import InvoiceTable from '../InvoiceTable';
import { act } from 'react-dom/test-utils';

const testData = {
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

describe('InvoiceTable component testing', () => {
  test('should render componnet', () => {
    render(<InvoiceTable data={testData.items} total={testData.total} />);
    const amount = screen.queryByText(/Amount Due/i);
    expect(amount).toBeInTheDocument();
  });

  test('should have 3 rows', () => {
    render(<InvoiceTable data={testData.items} total={testData.total} />);
    const items = screen.getAllByRole('row');
    expect(items).toHaveLength(3);
  });

  test('should have correct item name', () => {
    render(<InvoiceTable data={testData.items} total={testData.total} />);
    const itemName = screen.queryByRole('cell', { name: 'Email Design' });
    expect(itemName).toBeInTheDocument();
  });
  test('should have correct qty', () => {
    render(<InvoiceTable data={testData.items} total={testData.total} />);
    const qty = screen.queryByRole('cell', { name: '2' });
    expect(qty).toBeInTheDocument();
  });
  test('should have correct price', () => {
    render(<InvoiceTable data={testData.items} total={testData.total} />);
    const price = screen.queryByRole('cell', { name: '£200.00' });
    expect(price).toBeInTheDocument();
  });
  test('should have correct iten name', () => {
    render(<InvoiceTable data={testData.items} total={testData.total} />);
    const total = screen.queryByRole('cell', { name: '£400.00' });
    expect(total).toBeInTheDocument();
  });

  test('should have amount due', () => {
    render(<InvoiceTable data={testData.items} total={testData.total} />);
    const total = screen.queryByText(/£556.00/i);

    expect(total).toBeInTheDocument();
  });

  test('should not render MobileTable component when window size greater than 575', () => {
    render(<InvoiceTable data={testData.items} total={testData.total} />);
    const mobileTable = screen.queryByTestId('mobile-table');
    expect(mobileTable).not.toBeInTheDocument();
  });
  test('should render MobileTable component when window size less than 575', () => {
    render(<InvoiceTable data={testData.items} total={testData.total} />);
    act(() => window.resizeTo(500, 500));

    const mobileTable = screen.getByTestId('mobile-table');
    expect(mobileTable).toBeInTheDocument();
  });
});
