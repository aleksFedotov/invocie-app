import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import InvoiceForm from '../InvoiceForm';

describe('InvoiceForm componrnt testing', () => {
  test('should render component', () => {
    render(<InvoiceForm />);
    const form = screen.getByText(/bill to/i);
    expect(form).toBeInTheDocument();
  });
  test('should handle sender addres input', () => {
    render(<InvoiceForm />);
    const address = screen.getByLabelText(/senderAddress/i);
    fireEvent.change(address, { target: { value: '19 Union Terrace' } });
    expect(address).toHaveValue('19 Union Terrace');
  });
  test('should handle sender city input', () => {
    render(<InvoiceForm />);
    const city = screen.getByLabelText(/senderCity/i);
    fireEvent.change(city, { target: { value: 'London' } });
    expect(city).toHaveValue('London');
  });
  test('should handle sender Post code input', () => {
    render(<InvoiceForm />);
    const code = screen.getByLabelText(/senderPostCode/i);
    fireEvent.change(code, { target: { value: 'E1 3EZ' } });
    expect(code).toHaveValue('E1 3EZ');
  });
  test('should handle sender country input', () => {
    render(<InvoiceForm />);
    const country = screen.getByLabelText(/senderCountry/i);
    fireEvent.change(country, { target: { value: 'United Kingdom' } });
    expect(country).toHaveValue('United Kingdom');
  });
  test('should handle client name input', () => {
    render(<InvoiceForm />);
    const clientN = screen.getByLabelText(/clientName/i);
    fireEvent.change(clientN, { target: { value: 'Alex Grim' } });
    expect(clientN).toHaveValue('Alex Grim');
  });
  test('should handle client email input', () => {
    render(<InvoiceForm />);
    const email = screen.getByLabelText(/clientEmail/i);
    fireEvent.change(email, { target: { value: 'alexgrim@mail.com' } });
    expect(email).toHaveValue('alexgrim@mail.com');
  });
  test('should handle client addres input', () => {
    render(<InvoiceForm />);
    const address = screen.getByLabelText(/clientAddress/i);
    fireEvent.change(address, { target: { value: '84 Church Way' } });
    expect(address).toHaveValue('84 Church Way');
  });
  test('should handle client city input', () => {
    render(<InvoiceForm />);
    const city = screen.getByLabelText(/clientCity/i);
    fireEvent.change(city, { target: { value: 'Bradford' } });
    expect(city).toHaveValue('Bradford');
  });
  test('should handle client Post code input', () => {
    render(<InvoiceForm />);
    const code = screen.getByLabelText(/clientPostCode/i);
    fireEvent.change(code, { target: { value: 'BD1 9PB' } });
    expect(code).toHaveValue('BD1 9PB');
  });
  test('should handle client country input', () => {
    render(<InvoiceForm />);
    const country = screen.getByLabelText(/clientCountry/i);
    fireEvent.change(country, { target: { value: 'United Kingdom' } });
    expect(country).toHaveValue('United Kingdom');
  });
});
