import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { FormProvider, useForm } from 'react-hook-form';

import FormInvoiceItems from '../FormInvoiceItems';
import React from 'react';
import { act } from 'react-dom/test-utils';

const Provider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const methods = useForm();
  return <FormProvider {...methods}>{children}</FormProvider>;
};

const mockComponent = () => {
  return (
    <Provider>
      <FormInvoiceItems />
    </Provider>
  );
};

describe('FormInvoiceItems component testing', () => {
  test('should render component', () => {
    render(mockComponent());
    const tableHead = screen.queryByText(/Item Name/i);
    expect(tableHead).toBeInTheDocument();
  });
  test('should have no items initialy', () => {
    render(mockComponent());
    const items = screen.queryAllByTestId(/invoice_item/i);
    expect(items).toHaveLength(0);
  });
  test('should add 3 items after clicking on add btn 3 times', async () => {
    render(mockComponent());
    const addBtn = screen.getByRole('button', { name: /Add New Item/i });
    fireEvent.click(addBtn);
    fireEvent.click(addBtn);
    fireEvent.click(addBtn);
    const deleteBtns = await screen.findAllByLabelText(/delete/i);

    await waitFor(() => {
      expect(deleteBtns).toHaveLength(3);
    });
  });
  test('should remove 2 items after clickin on delete btn 2 times', async () => {
    render(mockComponent());
    const addBtn = screen.getByRole('button', { name: /Add New Item/i });
    await act(async () => {
      await fireEvent.click(addBtn);
      await fireEvent.click(addBtn);
      await fireEvent.click(addBtn);
    });

    const deleteBtnOne = await screen.getByLabelText(/delete_0/i);
    const deleteBtnTwo = await screen.getByLabelText(/delete_1/i);
    await act(async () => {
      await fireEvent.click(deleteBtnOne);
      await fireEvent.click(deleteBtnTwo);
    });

    const deleteBtns = await screen.findAllByLabelText(/delete/i);

    expect(deleteBtns).toHaveLength(1);
  });
});
