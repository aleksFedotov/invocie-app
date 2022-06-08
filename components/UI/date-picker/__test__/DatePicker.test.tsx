import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import DatePicker from '../DatePicker';
import * as hook from '../../../../hooks/useToggle';

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

  test('should close calendar if user click outside of datePikcer', async () => {
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
    fireEvent.click(document.body);
    await waitFor(() => {
      const calender = screen.queryByTestId('calender');
      expect(calender).not.toBeInTheDocument();
    });
  });

  test('should change month after clicking prev month icon', () => {
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
    let yearMoth = screen.queryByText('May 2022');
    expect(yearMoth).toBeInTheDocument();
    const prev = screen.getByTestId('prevMonth');
    fireEvent.click(prev);
    yearMoth = screen.queryByText('Apr 2022');
    expect(yearMoth).toBeInTheDocument();
  });
  test('shoukd change year after clicking prev month icon', () => {
    render(
      <DatePicker
        label="Date"
        value={'2022-01-06'}
        isEdit={false}
        id={'Date'}
        onChange={onChange}
      />
    );
    const date = screen.getByRole('textbox');
    fireEvent.focus(date);
    let yearMoth = screen.queryByText('Jan 2022');
    expect(yearMoth).toBeInTheDocument();
    const prev = screen.getByTestId('prevMonth');
    fireEvent.click(prev);
    yearMoth = screen.queryByText('Dec 2021');
    expect(yearMoth).toBeInTheDocument();
  });

  test('should change month after clicking next month icon', () => {
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
    let yearMoth = screen.queryByText('May 2022');
    expect(yearMoth).toBeInTheDocument();
    const next = screen.getByTestId('nextMonth');
    fireEvent.click(next);
    yearMoth = screen.queryByText('Jun 2022');
    expect(yearMoth).toBeInTheDocument();
  });
  test('shoukd change year after clicking next month icon', () => {
    render(
      <DatePicker
        label="Date"
        value={'2022-12-06'}
        isEdit={false}
        id={'Date'}
        onChange={onChange}
      />
    );
    const date = screen.getByRole('textbox');
    fireEvent.focus(date);
    let yearMoth = screen.queryByText('Dec 2022');
    expect(yearMoth).toBeInTheDocument();
    const next = screen.getByTestId('nextMonth');
    fireEvent.click(next);
    yearMoth = screen.queryByText('Jan 2023');
    expect(yearMoth).toBeInTheDocument();
  });

  test('selected day should have class selected', () => {
    render(
      <DatePicker
        label="Date"
        value={'2022-12-06'}
        isEdit={false}
        id={'Date'}
        onChange={onChange}
      />
    );
    const date = screen.getByRole('textbox');
    fireEvent.focus(date);
    const day = screen.getByText('6');
    expect(day).toHaveClass('selected');
  });

  test('not selected day should not have class selected', () => {
    render(
      <DatePicker
        label="Date"
        value={'2022-12-06'}
        isEdit={false}
        id={'Date'}
        onChange={onChange}
      />
    );
    const date = screen.getByRole('textbox');
    fireEvent.focus(date);
    const day = screen.getByText('8');
    expect(day).not.toHaveClass('selected');
  });

  test('should call openhandlers.off after picking date', () => {
    const spy = jest.spyOn(hook, 'default');
    const handlers = {
      off: jest.fn(),
      on: jest.fn(),
      toggle: jest.fn(),
    };
    spy.mockReturnValue([true, handlers]);
    render(
      <DatePicker
        label="Date"
        value={'2022-12-06'}
        isEdit={false}
        id={'Date'}
        onChange={onChange}
      />
    );

    const day = screen.getByText(/19/i);
    fireEvent.click(day);
    expect(handlers.off).toBeCalled();
  });
});
