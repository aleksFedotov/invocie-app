import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import '@testing-library/jest-dom';

import SelectDropdown from '../SelectDropdown';

const onChange = jest.fn();

describe('SelectDropdown component testting', () => {
  test('should render component', () => {
    render(
      <SelectDropdown
        label="Payment Terms"
        id="terms"
        value={''}
        onChange={onChange}
      />
    );
    const select = screen.getByTestId('selectDropDown');
    expect(select).toBeInTheDocument();
  });

  test('should have default value', () => {
    render(
      <SelectDropdown
        label="Payment Terms"
        id="terms"
        value={''}
        onChange={onChange}
      />
    );
    const value = screen.getByTestId(/selectedValue/i);
    expect(value).toHaveTextContent(/Net 30 Days/i);
  });

  test('should not have dropdown initialy', () => {
    render(
      <SelectDropdown
        label="Payment Terms"
        id="terms"
        value={''}
        onChange={onChange}
      />
    );
    const dropdown = screen.queryByTestId('dropdown');
    expect(dropdown).not.toBeInTheDocument();
  });
  test('should  have dropdown  after click and after second click dropdown shoild be removed', async () => {
    render(
      <SelectDropdown
        label="Payment Terms"
        id="terms"
        value={''}
        onChange={onChange}
      />
    );
    const select = screen.getByTestId('selectDropDown');
    fireEvent.click(select);
    const dropdown = await screen.findByTestId('dropdown');
    expect(dropdown).toBeInTheDocument();
    fireEvent.click(select);
    waitFor(() => {
      expect(dropdown).not.toBeInTheDocument();
    });
  });

  test('should update value after click on one of options', async () => {
    render(
      <SelectDropdown
        label="Payment Terms"
        id="terms"
        value={''}
        onChange={onChange}
      />
    );
    const select = screen.getByTestId('selectDropDown');
    fireEvent.click(select);
    const option = await screen.getByText(/Net 14 Days/i);
    fireEvent.click(option);
    const value = screen.getByTestId(/selectedValue/i);
    expect(value).toHaveTextContent('Net 14 Days');
  });
});
