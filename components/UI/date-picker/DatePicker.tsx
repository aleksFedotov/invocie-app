import React, { useCallback, useEffect, useRef, useState } from 'react';
import useToggle from '../../../hooks/useToggle';
import { getDaysInMonth, format, getYear } from 'date-fns';
import CalendarIcon from '../../../public/assets/icon-calendar.svg';
import ArrowLeftIcon from '../../../public/assets/icon-arrow-left.svg';
import ArrowRightIcon from '../../../public/assets/icon-arrow-right.svg';

import {
  Calendar,
  CalendarNav,
  DataPickerWrapper,
  DateInput,
  DateInputWrapper,
  DaysGrid,
} from './DatePickerStyles';

export const DatePicker: React.FC<{
  label: string;
  value: string | number;
  isEdit: boolean;
  id: string;
  onChange: (date: string) => void;
}> = ({ onChange, value, label, isEdit, id, ...props }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Set iniital date if edit then value if new then current date

  const initialSelectedDate = value ? new Date(value) : new Date(Date.now());
  const initialCurrentMonth = new Date(initialSelectedDate).getMonth();
  const initialCurrentYear = getYear(initialSelectedDate);
  const initialDaysInMonth = getDaysInMonth(initialSelectedDate);

  const [open, openHandlers] = useToggle();

  //   Set initial data
  const [selectedDate, setSelectedDate] = useState(initialSelectedDate);
  const [currentMonth, setCurrentMonth] = useState(initialCurrentMonth);
  const [currentYear, setCurrentYear] = useState(initialCurrentYear);
  const [daysInMonth, setDaysInMonth] = useState(initialDaysInMonth);
  console.log(selectedDate);

  // useEffect(() => {
  //   setSelectedDate(new Date(value));
  // }, [value]);

  const resetDaysInMonthEffect = () => {
    setDaysInMonth(getDaysInMonth(new Date(currentYear, currentMonth)));
  };

  // Close if user clicks outside picker
  const handleClickOff = useCallback(
    (e: MouseEvent) => {
      const target = e.target as Node;
      if (!ref.current?.contains(target)) {
        openHandlers.off();
      }
    },
    [openHandlers]
  );

  const clickOffEffect = () => {
    if (open) {
      window.addEventListener('click', handleClickOff);
    } else {
      window.removeEventListener('click', handleClickOff);
    }
    return () => {
      window.removeEventListener('click', handleClickOff);
    };
  };

  const setFocus = () => {
    if (open) {
      inputRef.current?.focus();
    } else {
      inputRef.current?.blur();
    }
  };

  useEffect(resetDaysInMonthEffect, [currentMonth, currentYear]);
  useEffect(clickOffEffect, [open, handleClickOff]);
  useEffect(setFocus, [open]);

  // handlers
  const handlePrevMonth = () => {
    setCurrentMonth((curr) => {
      if (curr - 1 < 0) {
        setCurrentYear((prev) => prev - 1);
        return 11;
      } else {
        return curr - 1;
      }
    });
  };

  const handleNextMonth = () => {
    setCurrentMonth((curr) => {
      if (curr + 1 > 11) {
        setCurrentYear((prev) => prev + 1);
        return 0;
      } else {
        return curr + 1;
      }
    });
  };

  const handleDateSelect = (selectedDay: number) => {
    const newDate = new Date(currentYear, currentMonth, selectedDay);
    setSelectedDate(newDate);
    onChange(format(newDate, 'yyyy-MM-dd'));
  };
  useEffect(() => {
    openHandlers.off();
  }, [openHandlers, selectedDate]);

  return (
    <DataPickerWrapper isEdit={isEdit} ref={ref}>
      <label id={id}>{label}</label>
      <DateInputWrapper>
        <DateInput
          value={format(selectedDate, 'dd MMM yyyy')}
          ref={inputRef}
          onFocus={() => {
            openHandlers.on();
          }}
          readOnly={true}
          disabled={isEdit}
          aria-label={id}
        ></DateInput>
        <CalendarIcon className="calendarIcon" />
      </DateInputWrapper>
      {open && (
        <Calendar>
          <CalendarNav>
            <button onClick={handlePrevMonth} type="button">
              <ArrowLeftIcon />
            </button>
            <p>
              {format(new Date(currentYear, currentMonth), 'MMM')} {currentYear}
            </p>
            <button onClick={handleNextMonth} type="button">
              <ArrowRightIcon />
            </button>
          </CalendarNav>
          <DaysGrid>
            {Array.from(Array(daysInMonth).keys())
              .map((p) => p + 1)
              .map((p, i) =>
                selectedDate.getDate() === p &&
                selectedDate.getFullYear() === currentYear &&
                selectedDate.getMonth() === currentMonth ? (
                  <p
                    key={i}
                    className="selected"
                    onClick={() => handleDateSelect(p)}
                  >
                    {p}
                  </p>
                ) : (
                  <p key={i} onClick={() => handleDateSelect(p)}>
                    {p}
                  </p>
                )
              )}
          </DaysGrid>
        </Calendar>
      )}
    </DataPickerWrapper>
  );
};

export default DatePicker;
