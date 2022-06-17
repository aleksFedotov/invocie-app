import React, { useEffect, useState, useRef, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';

import {
  SelectInputWrapper,
  SelectWrapper,
  Dropdown,
  Option,
} from './SelectDropdownStyles';
import useToggle from '../../../hooks/useToggle';

import ArrowDownIcon from '../../../public/assets/icon-arrow-down.svg';

type TermOption = {
  text: string;
  value: string;
};

type ValueOptions = {
  [key: number]: TermOption;
};

// Optios for tern selection
const valueOptions: ValueOptions = {
  1: {
    text: 'Net 1 Day',
    value: '1',
  },
  7: {
    text: 'Net 7 Days',
    value: '7',
  },
  14: {
    text: 'Net 14 Days',
    value: '14',
  },
  30: {
    text: 'Net 30 Days',
    value: '30',
  },
};

const SelectDropdown: React.FC<{
  label: string;
  id: string;
  value: number;
  onChange: (n: number) => void;
}> = ({ label, id, value, onChange, ...props }) => {
  // States
  const [selectedOption, setSeletedOption] = useState<TermOption>(
    value
      ? valueOptions[value]
      : {
          text: 'Net 30 Days',
          value: '30',
        }
  );
  // Hooks
  const [isDroped, dropHandlers] = useToggle();
  // Refs
  const ref = useRef<HTMLDivElement>(null);

  // Seting options and closing select dropdonw
  const optionClickHandler = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;

    setSeletedOption({
      text: target.textContent!,
      value: target.dataset.value!,
    });

    dropHandlers.off();
  };

  // change option from string to number
  useEffect(() => {
    onChange(+selectedOption.value);
  }, [onChange, selectedOption.value]);

  // Animation variants for framer-motion
  const dropdownVariants = {
    hidden: {
      scaleY: 0,
    },
    visible: {
      scaleY: 1,

      transition: { duration: 0.3 },
    },
    exit: {
      scaleY: 0,

      transition: { duration: 0.3 },
    },
  };

  // Close if user clicks outside picker
  const handleClickOff = useCallback(
    (e: MouseEvent) => {
      const target = e.target as Node;
      if (!ref.current?.contains(target)) {
        dropHandlers.off();
      }
    },
    [dropHandlers]
  );

  const clickOffEffect = () => {
    if (isDroped) {
      window.addEventListener('click', handleClickOff);
    } else {
      window.removeEventListener('click', handleClickOff);
    }
    return () => {
      window.removeEventListener('click', handleClickOff);
    };
  };

  useEffect(clickOffEffect, [isDroped, handleClickOff]);

  return (
    <SelectWrapper ref={ref}>
      <p id={id}>{label}</p>
      <SelectInputWrapper
        isDroped={isDroped}
        onClick={() => {
          dropHandlers.toggle();
        }}
        data-testid="selectDropDown"
      >
        <span data-testid="selectedValue">{selectedOption.text}</span>
        <ArrowDownIcon />
      </SelectInputWrapper>
      <AnimatePresence>
        {isDroped && (
          <Dropdown
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{ originY: 0 }}
            data-testid="dropdown"
          >
            <Option data-value="1" onClick={optionClickHandler}>
              Net 1 Day
            </Option>
            <Option data-value="7" onClick={optionClickHandler}>
              Net 7 Days
            </Option>
            <Option data-value="14" onClick={optionClickHandler}>
              Net 14 Days
            </Option>
            <Option data-value="30" onClick={optionClickHandler}>
              Net 30 Days
            </Option>
          </Dropdown>
        )}
      </AnimatePresence>
    </SelectWrapper>
  );
};

export default SelectDropdown;
