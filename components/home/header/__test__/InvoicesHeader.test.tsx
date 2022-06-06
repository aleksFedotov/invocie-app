import {
  fireEvent,
  render,
  screen,
  act,
} from '../../../../test-utils/testUtils';
import '@testing-library/jest-dom';

import InvoicesHeader from '../InvoicesHeader';
import { useAppDispatch } from '../../../../store/hooks';

jest.mock('../../../../store/hooks', () => ({
  ...jest.requireActual('../../../../store/hooks'),
  useAppDispatch: jest.fn(),
}));

window.resizeTo = function resizeTo(width, height) {
  Object.assign(this, {
    innerWidth: width,
    innerHeight: height,
    outerWidth: width,
    outerHeight: height,
  }).dispatchEvent(new this.Event('resize'));
};

describe('InvoceHeader component testing', () => {
  test('should render component', () => {
    render(<InvoicesHeader total={7} />);
    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();
  });

  test('should render "Invoices" h1 heading', () => {
    render(<InvoicesHeader total={7} />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent(/invoices/i);
  });

  test('should have paragraph with right number of ivoices', () => {
    render(<InvoicesHeader total={7} />);
    const text = screen.getByText(/There are 7 total Invoices/i);
    expect(text).toBeInTheDocument();
  });

  test('should have filter', () => {
    render(<InvoicesHeader total={7} />);
    const fitler = screen.getByText(/Filter by status/i);
    expect(fitler).toBeInTheDocument();
  });

  test('should have "new invoice" button', () => {
    render(<InvoicesHeader total={7} />);
    const button = screen.getByText(/new invoice/i);
    expect(button).toBeInTheDocument();
  });

  test('should not have drop filter menu initialy', () => {
    render(<InvoicesHeader total={7} />);
    const filters = screen.queryByTestId('filters');
    expect(filters).toBeNull();
  });

  test('should render filter menu after click', async () => {
    render(<InvoicesHeader total={7} />);
    const fitlerMenu = screen.getByText(/Filter by status/i);
    fireEvent.click(fitlerMenu);
    const filters = await screen.findByTestId('filters');
    expect(filters).toBeInTheDocument();
  });

  test("total text should be 'There are 7 total invoices' when screen width is 1440", () => {
    render(<InvoicesHeader total={7} />);
    act(() => {
      window.resizeTo(1440, 900);
    });
    const total = screen.queryByTestId('total');
    expect(total).toHaveTextContent(/There are 7 total invoices/i);
  });
  test("total text should be '7 total' when screen width is less 650", () => {
    render(<InvoicesHeader total={7} />);
    act(() => {
      window.resizeTo(540, 540);
    });
    const total = screen.queryByTestId('total');
    expect(total).toHaveTextContent(/7 invoices/i);
  });

  test("total text should be 'No invoices' when where is no invoices in input data", () => {
    render(<InvoicesHeader total={0} />);
    const total = screen.queryByTestId('total');
    expect(total).toHaveTextContent(/No invoices/i);
  });

  test('should call dispatch after clickin on btn', () => {
    const dispatch = jest.fn();
    // @ts-ignore
    useAppDispatch.mockReturnValue(dispatch);
    render(<InvoicesHeader total={7} />);
    const btn = screen.getByRole('button', { name: /new/i });
    fireEvent.click(btn);
    expect(dispatch).toBeCalled();
  });
});
