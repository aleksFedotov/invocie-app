import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import FormInput from '../FormInput';

describe('FormImput testing', () => {
  test('Should render component', () => {
    render(
      <FormInput
        id="firstName"
        label="First Name"
        placeholder="First Name"
        error={false}
      />
    );

    const input = screen.getByText(/First Name/i);
    expect(input).toBeInTheDocument();
  });
  test('Should render error can not be epmty', () => {
    render(
      <FormInput
        id="firstName"
        label="First Name"
        placeholder="First Name"
        error={{ message: "Can't be empty" }}
      />
    );

    const alert = screen.getByRole('alert');
    expect(alert).toHaveTextContent(/Can't be empty/i);
  });
  test('Should render error invalid email', () => {
    render(
      <FormInput
        id="clientEmail"
        label="First Name"
        placeholder="First Name"
        error={{ message: 'Invalid email' }}
      />
    );

    const alert = screen.getByRole('alert');
    expect(alert).toHaveTextContent(/Invalid email/i);
  });
  test('Should render epmty placeholder', () => {
    render(<FormInput id="clientEmail" label="Client Email" error={false} />);

    const input = screen.getByLabelText(/clientEmail/i);
    expect(input).toHaveAttribute('placeholder', '');
  });
  test('Should render Client Email placeholder', () => {
    render(
      <FormInput
        id="clientEmail"
        label="Client Email"
        placeholder="Client Email"
        error={false}
      />
    );

    const input = screen.getByLabelText(/clientEmail/i);
    expect(input).toHaveAttribute('placeholder', 'Client Email');
  });
});
