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
    screen.debug();
    const input = screen.getByText(/First Name/i);
    expect(input).toBeInTheDocument();
  });
});
