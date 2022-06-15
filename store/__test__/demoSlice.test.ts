import store from '../store';
import {
  loginDemo,
  logoutDemo,
  createInvoice,
  deleteInvoice,
  editInvoice,
  markAsPaid,
} from '../demoSlice';
import { waitFor } from '@testing-library/react';

const testData = {
  id: 'RT3080',
  createdAt: '2021-08-18',
  paymentDue: '2021-08-19',
  description: 'Re-branding',
  paymentTerms: 1,
  clientName: 'Jensen Huang',
  clientEmail: 'jensenh@mail.com',
  status: 'pending',
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

const modifiedData = {
  id: 'RT3080',
  createdAt: '2021-08-18',
  paymentDue: '2021-08-19',
  description: 'Re-branding',
  paymentTerms: 1,
  clientName: 'Alex Huang',
  clientEmail: 'jensenh@mail.com',
  status: 'pending',
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

describe('demoSlice  testing', () => {
  test('should have correct  initial state', () => {
    const isDemoMode = store.getState().demo.isDemoMode;
    const invocies = store.getState().demo.invoices;
    expect(isDemoMode).toEqual(false);
    expect(invocies).toHaveLength(7);
  });

  test('should change isDemoMode to true after loginDemo', () => {
    store.dispatch(loginDemo());
    const isDemoMode = store.getState().demo.isDemoMode;
    expect(isDemoMode).toEqual(true);
  });
  test('should change isDemoMode to false after logoutDemo', () => {
    store.dispatch(loginDemo());
    let isDemoMode = store.getState().demo.isDemoMode;
    expect(isDemoMode).toEqual(true);
    store.dispatch(logoutDemo());
    isDemoMode = store.getState().demo.isDemoMode;
    expect(isDemoMode).toEqual(false);
  });

  test('should add new invoice', async () => {
    store.dispatch(createInvoice(testData));
    const invocies = store.getState().demo.invoices;
    await waitFor(() => {
      expect(invocies).toHaveLength(8);
      expect(invocies[0].id).toEqual('RT3080');
    });
  });

  test('should edit invoice', () => {
    const invocies = store.getState().demo.invoices;
    expect(invocies[0].clientName).toEqual('Jensen Huang');
    store.dispatch(editInvoice({ id: 'RT3080', invoice: modifiedData }));
    const modInvocies = store.getState().demo.invoices;
    expect(modInvocies[0].clientName).toEqual('Alex Huang');
  });

  test('should change status of inoice to paid', () => {
    const invocies = store.getState().demo.invoices;
    expect(invocies[0].status).toEqual('pending');
    store.dispatch(markAsPaid('RT3080'));
    const modInvocies = store.getState().demo.invoices;
    expect(modInvocies[0].status).toEqual('paid');
  });

  test('should delete invoice', () => {
    store.dispatch(deleteInvoice('RT3080'));
    const invocies = store.getState().demo.invoices;
    expect(invocies).toHaveLength(6);
  });
});
