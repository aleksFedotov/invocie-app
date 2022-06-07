import {
  fireEvent,
  render,
  screen,
  waitFor,
  act,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import store from '../../../../store/store';
import { IInvoice } from '../../../../@types/types';
import * as httpHook from '../../../../hooks/useHttp';
import * as nookies from 'nookies';
import { useAppDispatch } from '../../../../store/hooks';
import * as generateData from '../../../../libs/generateData';

import InvoiceForm from '../InvoiceForm';
import { useRouter } from 'next/router';

jest.mock('../../../../store/hooks', () => ({
  ...jest.requireActual('../../../../store/hooks'),
  useAppDispatch: jest.fn(),
}));
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

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
    test('should handle project description input', () => {
      render(mockComponent());
      const description = screen.getByLabelText(/description/i);
      fireEvent.change(description, { target: { value: 'Re-branding' } });
      expect(description).toHaveValue('Re-branding');
    });

    test('should pass validation with correct data and call onSubmit function', async () => {
      const mockSendRequest = jest.fn();

      const spyHttp = jest.spyOn(httpHook, 'default');
      spyHttp.mockReturnValue({
        isLoading: false,
        error: false,
        sendRequest: mockSendRequest,
      });
      const spyCookies = jest.spyOn(nookies, 'parseCookies');
      spyCookies.mockReturnValue({
        userData: '{}',
      });
      const data = '{}';
      const spyGenerateData = jest.spyOn(generateData, 'default');
      // @ts-ignore
      spyGenerateData.mockReturnValue(() => {
        data;
      });
      const replace = jest.fn();
      // @ts-ignore
      useRouter.mockImplementation(() => ({ replace }));

      render(mockComponent());
      const address = screen.getByLabelText(/senderStreet/i);
      fireEvent.change(address, { target: { value: '19 Union Terrace' } });
      const city = screen.getByLabelText(/senderCity/i);
      fireEvent.change(city, { target: { value: 'London' } });
      const code = screen.getByLabelText(/senderPostCode/i);
      fireEvent.change(code, { target: { value: 'E1 3EZ' } });
      const country = screen.getByLabelText(/senderCountry/i);
      fireEvent.change(country, { target: { value: 'United Kingdom' } });
      const clientN = screen.getByLabelText(/clientName/i);
      fireEvent.change(clientN, { target: { value: 'Alex Grim' } });
      const email = screen.getByLabelText(/clientEmail/i);
      fireEvent.change(email, { target: { value: 'alexgrim@mail.com' } });
      const clientAddress = screen.getByLabelText(/clientStreet/i);
      fireEvent.change(clientAddress, { target: { value: '84 Church Way' } });
      const clientCity = screen.getByLabelText(/clientCity/i);
      fireEvent.change(clientCity, { target: { value: 'Bradford' } });
      const clientCode = screen.getByLabelText(/clientPostCode/i);
      fireEvent.change(clientCode, { target: { value: 'BD1 9PB' } });
      const clientCountry = screen.getByLabelText(/clientCountry/i);
      fireEvent.change(clientCountry, { target: { value: 'United Kingdom' } });
      const description = screen.getByLabelText(/description/i);
      fireEvent.change(description, { target: { value: 'Re-branding' } });
      const addBtn = screen.getByRole('button', { name: /\+ Add New Item/i });
      await act(() => {
        fireEvent.click(addBtn);
      });
      const itemName = screen.getByLabelText(/itemName/i);
      fireEvent.change(itemName, { target: { value: 'Banner Design' } });
      const quantity = screen.getByLabelText(/quantity/i);
      fireEvent.change(quantity, { target: { value: '4' } });
      const price = screen.getByLabelText(/price/i);
      fireEvent.change(price, { target: { value: '100' } });

      const submitBTn = screen.getByRole('button', { name: /Save & Send/i });
      await act(() => {
        fireEvent.click(submitBTn);
      });

      await waitFor(() => {
        const errors = screen.queryAllByRole('alert');

        expect(errors).toHaveLength(0);
        expect(mockSendRequest).toBeCalledWith({
          url: '/api/invoice/new',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: data,
        });
      });

      await waitFor(() => {
        expect(replace).toBeCalled();
      });
    });

    test('should not pass validation with incorect data', async () => {
      render(mockComponent());
      const address = screen.getByLabelText(/senderStreet/i);
      fireEvent.change(address, { target: { value: '' } });
      const city = screen.getByLabelText(/senderCity/i);
      fireEvent.change(city, { target: { value: '' } });
      const code = screen.getByLabelText(/senderPostCode/i);
      fireEvent.change(code, { target: { value: '' } });
      const country = screen.getByLabelText(/senderCountry/i);
      fireEvent.change(country, { target: { value: '' } });
      const clientN = screen.getByLabelText(/clientName/i);
      fireEvent.change(clientN, { target: { value: '' } });
      const email = screen.getByLabelText(/clientEmail/i);
      fireEvent.change(email, { target: { value: 'a' } });
      const clientAddress = screen.getByLabelText(/clientStreet/i);
      fireEvent.change(clientAddress, { target: { value: '' } });
      const clientCity = screen.getByLabelText(/clientCity/i);
      fireEvent.change(clientCity, { target: { value: '' } });
      const clientCode = screen.getByLabelText(/clientPostCode/i);
      fireEvent.change(clientCode, { target: { value: '' } });
      const clientCountry = screen.getByLabelText(/clientCountry/i);
      fireEvent.change(clientCountry, { target: { value: '' } });
      const description = screen.getByLabelText(/description/i);
      fireEvent.change(description, { target: { value: '' } });
      const addBtn = screen.getByRole('button', { name: /\+ Add New Item/i });
      await act(() => {
        fireEvent.click(addBtn);
      });
      const itemName = screen.getByLabelText(/itemName/i);
      fireEvent.change(itemName, { target: { value: 'Banner Design' } });
      const quantity = screen.getByLabelText(/quantity/i);
      fireEvent.change(quantity, { target: { value: '4' } });
      const price = screen.getByLabelText(/price/i);
      fireEvent.change(price, { target: { value: '100' } });
      const submitBTn = screen.getByRole('button', { name: /Save & Send/i });
      await act(() => {
        fireEvent.click(submitBTn);
      });

      await waitFor(() => {
        const errors = screen.queryAllByRole('alert');

        expect(errors).toHaveLength(11);
      });
    });

    test("should handle 'save as draft' action", async () => {
      const mockSendRequest = jest.fn();

      const spyHttp = jest.spyOn(httpHook, 'default');
      spyHttp.mockReturnValue({
        isLoading: false,
        error: false,
        sendRequest: mockSendRequest,
      });
      const spyCookies = jest.spyOn(nookies, 'parseCookies');
      spyCookies.mockReturnValue({
        userData: '{}',
      });
      const replace = jest.fn();
      // @ts-ignore
      useRouter.mockImplementation(() => ({ replace }));
      render(mockComponent());
      const draftBTn = screen.getByRole('button', { name: 'Save as Draft' });
      fireEvent.click(draftBTn);
      await waitFor(() => {
        expect(mockSendRequest).toBeCalled();
        expect(replace).toBeCalled();
      });
    });

    test('should call dispacth after cliking back button', () => {
      const dispatch = jest.fn();
      // @ts-ignore
      useAppDispatch.mockReturnValue(dispatch);

      render(mockComponent());
      const backBtn = screen.getByTestId('backBtn');
      fireEvent.click(backBtn);
      expect(dispatch).toBeCalled();
    });
    test('should call dispacth after cliking discard', () => {
      const dispatch = jest.fn();
      // @ts-ignore
      useAppDispatch.mockReturnValue(dispatch);

      render(mockComponent());
      const discardBtn = screen.getByRole('button', { name: /Discard/i });
      fireEvent.click(discardBtn);
      expect(dispatch).toBeCalled();
    });
    test('shoul render message if sneding data failed', () => {
      const spyHttp = jest.spyOn(httpHook, 'default');
      spyHttp.mockReturnValue({
        isLoading: false,
        error: 'Test error',
        sendRequest: jest.fn(),
      });
      render(mockComponent());
      const msg = screen.getByText('Test error');
      expect(msg).toBeInTheDocument();
    });

    test('should render loading spinner while promise is pending', () => {
      const spyHttp = jest.spyOn(httpHook, 'default');
      spyHttp.mockReturnValue({
        isLoading: true,
        error: false,
        sendRequest: jest.fn(),
      });
      render(mockComponent());
      const spinner = screen.getByText('Submitting...');
      expect(spinner).toBeInTheDocument();
    });

    test("should render error message '- All fields must be added' and '- An item must be added'", async () => {
      render(mockComponent());
      const submitBTn = screen.getByRole('button', { name: /Save & Send/i });
      fireEvent.click(submitBTn);
      await waitFor(() => {
        const filedsErorrMsg = screen.getByText('- All fields must be added');
        const itemErorrMsg = screen.getByText('- An item must be added');
        expect(filedsErorrMsg).toBeInTheDocument();
        expect(itemErorrMsg).toBeInTheDocument();
      });
    });
  });

  describe('testing edit form', () => {
    test('should render component', () => {
      render(mockComponent('edit', testData));
      const id = screen.queryByText(/RT3080/i);
      expect(id).toBeInTheDocument();
    });
    test('should have value initialy in street input', () => {
      render(mockComponent('edit', testData));
      const address = screen.getByLabelText(/senderStreet/i);
      waitFor(() => {
        expect(address).toHaveValue('19 Union Terrace');
      });
    });
    test('should have value initialy in sender city input', () => {
      render(mockComponent('edit', testData));
      const city = screen.getByLabelText(/senderCity/i);
      waitFor(() => {
        expect(city).toHaveValue('London');
      });
    });
    test('should have value initialy in Post code input', () => {
      render(mockComponent('edit', testData));
      const code = screen.getByLabelText(/senderPostCode/i);
      waitFor(() => {
        expect(code).toHaveValue('E1 3EZ');
      });
    });
    test('should have value initialy in sender country input', () => {
      render(mockComponent('edit', testData));
      const country = screen.getByLabelText(/senderCountry/i);
      waitFor(() => {
        expect(country).toHaveValue('United Kingdom');
      });
    });
    test('should have value initialy in client name input', () => {
      render(mockComponent('edit', testData));
      const clientN = screen.getByLabelText(/clientName/i);
      waitFor(() => {
        expect(clientN).toHaveValue('Alex Grim');
      });
    });
    test('should have value initialy in client email input', () => {
      render(mockComponent('edit', testData));
      const email = screen.getByLabelText(/clientEmail/i);

      waitFor(() => {
        expect(email).toHaveValue('alexgrim@mail.com');
      });
    });
    test('should have value initialy in client addres input', () => {
      render(mockComponent('edit', testData));
      const address = screen.getByLabelText(/clientStreet/i);
      waitFor(() => {
        expect(address).toHaveValue('84 Church Way');
      });
    });
    test('should have value initialy in client city input', () => {
      render(mockComponent('edit', testData));
      const city = screen.getByLabelText(/clientCity/i);
      waitFor(() => {
        expect(city).toHaveValue('Bradford');
      });
    });
    test('should have value initialy in client Post code input', () => {
      render(mockComponent('edit', testData));
      const code = screen.getByLabelText(/clientPostCode/i);
      waitFor(() => {
        expect(code).toHaveValue('BD1 9PB');
      });
    });
    test('should have value initialy in client country input', () => {
      render(mockComponent('edit', testData));
      const country = screen.getByLabelText(/clientCountry/i);
      waitFor(() => {
        expect(country).toHaveValue('United Kingdom');
      });
    });
    test('should call dispacth after cliking discard', () => {
      const dispatch = jest.fn();
      // @ts-ignore
      useAppDispatch.mockReturnValue(dispatch);

      render(mockComponent('edit', testData));
      const canceldBtn = screen.getByRole('button', { name: /cancel/i });
      fireEvent.click(canceldBtn);
      expect(dispatch).toBeCalled();
    });

    test('should pass validation with correct data and call onSubmit function', async () => {
      const mockSendRequest = jest.fn();

      const spyHttp = jest.spyOn(httpHook, 'default');
      spyHttp.mockReturnValue({
        isLoading: false,
        error: false,
        sendRequest: mockSendRequest,
      });
      const spyCookies = jest.spyOn(nookies, 'parseCookies');
      spyCookies.mockReturnValue({
        userData: '{}',
      });
      const data = '{}';
      const spyGenerateData = jest.spyOn(generateData, 'default');
      // @ts-ignore
      spyGenerateData.mockReturnValue(() => {
        data;
      });
      const replace = jest.fn();
      // @ts-ignore
      useRouter.mockImplementation(() => ({ replace }));

      render(mockComponent('edit', testData));

      const submitBTn = screen.getByRole('button', { name: /Save Changes/i });

      fireEvent.click(submitBTn);

      await waitFor(() => {
        const errors = screen.queryAllByRole('alert');

        expect(errors).toHaveLength(0);
        expect(mockSendRequest).toBeCalledWith({
          url: '/api/invoice/edit',
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: data,
        });
      });

      await waitFor(() => {
        expect(replace).toBeCalled();
      });
    });
  });
});
