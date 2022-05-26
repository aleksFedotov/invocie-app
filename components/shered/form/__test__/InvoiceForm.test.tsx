import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import store from '../../../../store/store';
import { IInvoice } from '../../../../@types/types';

import InvoiceForm from '../InvoiceForm';

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

const mockComponent = (mode = 'create', data?: IInvoice) => {
  if (mode === 'edit') {
    return (
      <Provider store={store}>
        <InvoiceForm edit data={data} />
      </Provider>
    );
  }
  return (
    <Provider store={store}>
      <InvoiceForm create />
    </Provider>
  );
};

describe('InvoiceForm componrnt testing', () => {
  describe('etsting create form', () => {
    test('should render component', () => {
      render(mockComponent());
      const form = screen.getByText(/bill to/i);
      expect(form).toBeInTheDocument();
    });
    test('should handle sender addres input', () => {
      render(mockComponent());
      const address = screen.getByLabelText(/senderStreet/i);
      fireEvent.change(address, { target: { value: '19 Union Terrace' } });
      expect(address).toHaveValue('19 Union Terrace');
    });
    test('should handle sender city input', () => {
      render(mockComponent());
      const city = screen.getByLabelText(/senderCity/i);
      fireEvent.change(city, { target: { value: 'London' } });
      expect(city).toHaveValue('London');
    });
    test('should handle sender Post code input', () => {
      render(mockComponent());
      const code = screen.getByLabelText(/senderPostCode/i);
      fireEvent.change(code, { target: { value: 'E1 3EZ' } });
      expect(code).toHaveValue('E1 3EZ');
    });
    test('should handle sender country input', () => {
      render(mockComponent());
      const country = screen.getByLabelText(/senderCountry/i);
      fireEvent.change(country, { target: { value: 'United Kingdom' } });
      expect(country).toHaveValue('United Kingdom');
    });
    test('should handle client name input', () => {
      render(mockComponent());
      const clientN = screen.getByLabelText(/clientName/i);
      fireEvent.change(clientN, { target: { value: 'Alex Grim' } });
      expect(clientN).toHaveValue('Alex Grim');
    });
    test('should handle client email input', () => {
      render(mockComponent());
      const email = screen.getByLabelText(/clientEmail/i);
      fireEvent.change(email, { target: { value: 'alexgrim@mail.com' } });
      expect(email).toHaveValue('alexgrim@mail.com');
    });
    test('should handle client addres input', () => {
      render(mockComponent());
      const address = screen.getByLabelText(/clientStreet/i);
      fireEvent.change(address, { target: { value: '84 Church Way' } });
      expect(address).toHaveValue('84 Church Way');
    });
    test('should handle client city input', () => {
      render(mockComponent());
      const city = screen.getByLabelText(/clientCity/i);
      fireEvent.change(city, { target: { value: 'Bradford' } });
      expect(city).toHaveValue('Bradford');
    });
    test('should handle client Post code input', () => {
      render(mockComponent());
      const code = screen.getByLabelText(/clientPostCode/i);
      fireEvent.change(code, { target: { value: 'BD1 9PB' } });
      expect(code).toHaveValue('BD1 9PB');
    });
    test('should handle client country input', () => {
      render(mockComponent());
      const country = screen.getByLabelText(/clientCountry/i);
      fireEvent.change(country, { target: { value: 'United Kingdom' } });
      expect(country).toHaveValue('United Kingdom');
    });
  });

  describe('testing edit form', () => {
    test('should render component', () => {
      render(mockComponent('edit', testData));
      const id = screen.queryByText(/RT3080/i);
      expect(id).toBeInTheDocument();
    });
    test('should have value initialy in street input', () => {
      render(mockComponent());
      const address = screen.getByLabelText(/senderStreet/i);
      waitFor(() => {
        expect(address).toHaveValue('19 Union Terrace');
      });
    });
    test('should have value initialy in sender city input', () => {
      render(mockComponent());
      const city = screen.getByLabelText(/senderCity/i);
      waitFor(() => {
        expect(city).toHaveValue('London');
      });
    });
    test('should have value initialy in Post code input', () => {
      render(mockComponent());
      const code = screen.getByLabelText(/senderPostCode/i);
      waitFor(() => {
        expect(code).toHaveValue('E1 3EZ');
      });
    });
    test('should have value initialy in sender country input', () => {
      render(mockComponent());
      const country = screen.getByLabelText(/senderCountry/i);
      waitFor(() => {
        expect(country).toHaveValue('United Kingdom');
      });
    });
    test('should have value initialy in client name input', () => {
      render(mockComponent());
      const clientN = screen.getByLabelText(/clientName/i);
      waitFor(() => {
        expect(clientN).toHaveValue('Alex Grim');
      });
    });
    test('should have value initialy in client email input', () => {
      render(mockComponent());
      const email = screen.getByLabelText(/clientEmail/i);

      waitFor(() => {
        expect(email).toHaveValue('alexgrim@mail.com');
      });
    });
    test('should have value initialy in client addres input', () => {
      render(mockComponent());
      const address = screen.getByLabelText(/clientStreet/i);
      waitFor(() => {
        expect(address).toHaveValue('84 Church Way');
      });
    });
    test('should have value initialy in client city input', () => {
      render(mockComponent());
      const city = screen.getByLabelText(/clientCity/i);
      waitFor(() => {
        expect(city).toHaveValue('Bradford');
      });
    });
    test('should have value initialy in client Post code input', () => {
      render(mockComponent());
      const code = screen.getByLabelText(/clientPostCode/i);
      waitFor(() => {
        expect(code).toHaveValue('BD1 9PB');
      });
    });
    test('should have value initialy in client country input', () => {
      render(mockComponent());
      const country = screen.getByLabelText(/clientCountry/i);
      waitFor(() => {
        expect(country).toHaveValue('United Kingdom');
      });
    });
  });
});
