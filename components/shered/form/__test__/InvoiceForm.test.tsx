import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import InvoiceForm from '../InvoiceForm';

describe('InvoiceForm componrnt testing', () => {
  test('should render component', () => {
    render(<InvoiceForm />);
    const form = screen.getByText(/bill to/i);
    expect(form).toBeInTheDocument();
  });
  test('should handle inputs', () => {
    render(<InvoiceForm />);
    const address = screen.getByLabelText(/senderAddress/i);
    fireEvent.change(address, { target: { value: '19 Union Terrace' } });
    expect(address).toHaveValue('19 Union Terrace');
  });
  // test('should render component', () => {
  //   render(<InvoiceForm/>)
  //   const form = screen.getByText(/bill to/i)
  //   expect(form).toBeInTheDocument()
  // });
});
