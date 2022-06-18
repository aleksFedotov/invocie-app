import { screen, render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { FormProvider, useForm } from 'react-hook-form';
import * as formHook from 'react-hook-form';

import FormItem from '../FormItem';
import { act } from 'react-dom/test-utils';

const mockRemove = jest.fn();

jest.mock('react-hook-form', () => ({
  ...jest.requireActual('react-hook-form'),
}));

const Provider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const methods = useForm({
    defaultValues: {
      items: [{ price: 0, quantity: 0, total: 0 }],
    },
  });
  return <FormProvider {...methods}>{children}</FormProvider>;
};

const mockComponent = () => {
  return (
    <Provider>
      <FormItem ind={0} remove={mockRemove} />
    </Provider>
  );
};

describe('FormItem component testing', () => {
  test('should render component', () => {
    render(mockComponent());
    const btn = screen.getByRole('button');
    expect(btn).toBeInTheDocument();
  });
  test('should change value in item name', () => {
    render(mockComponent());
    const itemName = screen.getByLabelText(/itemName/i);
    fireEvent.change(itemName, { target: { value: 'Banner Design' } });
    expect(itemName).toHaveValue('Banner Design');
  });
  test('should change value in quantity', () => {
    render(mockComponent());
    const quantity = screen.getByLabelText(/quantity/i);
    fireEvent.change(quantity, { target: { value: '4' } });
    expect(quantity).toHaveValue('4');
  });
  test('should change value in price', () => {
    render(mockComponent());
    const price = screen.getByLabelText(/price/i);
    fireEvent.change(price, { target: { value: '100' } });
    expect(price).toHaveValue('100');
  });
  test('should change value in total', () => {
    render(mockComponent());
    const quantity = screen.getByLabelText(/quantity/i);
    const price = screen.getByLabelText(/price/i);
    const total = screen.getByLabelText(/total/i);
    fireEvent.change(quantity, { target: { value: '4' } });
    fireEvent.change(price, { target: { value: '100' } });
    expect(total).toHaveValue('400.00');
  });

  test('should call remove after clicking on delete btn', () => {
    render(mockComponent());
    const btn = screen.getByRole('button');
    fireEvent.click(btn);
    expect(mockRemove).toBeCalled();
  });

  test('should change format on price after unfocus', async () => {
    render(mockComponent());
    const price = screen.getByLabelText(/price/i);
    fireEvent.change(price, { target: { value: '100' } });
    await act(() => {
      fireEvent.blur(price);
    });
    await waitFor(() => {
      expect(price).toHaveValue('100.00');
    });
  });
});
