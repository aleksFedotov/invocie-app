import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import DatePicker from '../DatePicker';

const onChange = jest.fn();

describe('DatePicker component testing', () => {
  test('', () => {
    render(
      <DatePicker
        label="Date"
        value={'2022-05-06'}
        isEdit={false}
        id={'Date'}
        onChange={onChange}
      />
    );
    const picker = screen.getByTestId(/datepicker/i);
    expect(picker).toBeInTheDocument();
  });

  test('should have date text', () => {
    render(
      <DatePicker
        label="Date"
        value={'2022-05-06'}
        isEdit={false}
        id={'Date'}
        onChange={onChange}
      />
    );
    const date = screen.getByRole('textbox');
    expect(date).toHaveValue('06 May 2022');
  });

  test('should not have calendar initialy', () => {
    render(
      <DatePicker
        label="Date"
        value={'2022-05-06'}
        isEdit={false}
        id={'Date'}
        onChange={onChange}
      />
    );
    const calender = screen.queryByTestId('calender');
    expect(calender).not.toBeInTheDocument();
  });

  test('should have calendar initialy after click', async () => {
    render(
      <DatePicker
        label="Date"
        value={'2022-05-06'}
        isEdit={false}
        id={'Date'}
        onChange={onChange}
      />
    );
    const date = screen.getByRole('textbox');
    fireEvent.focus(date);

    const calender = await screen.findByTestId('calender');
    expect(calender).toBeInTheDocument();
  });

  test('should update date after click on day number', async () => {
    render(
      <DatePicker
        label="Date"
        value={'2022-05-06'}
        isEdit={false}
        id={'Date'}
        onChange={onChange}
      />
    );
    const date = screen.getByRole('textbox');
    fireEvent.focus(date);

    const day = await screen.findByText(/19/i);
    fireEvent.click(day);

    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('19 May 2022');
  });
});
