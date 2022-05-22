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

type Option = {
  text: string;
  value: string;
};

const SelectDropdown: React.FC<{
  label: string;
  id: string;
  value: string;
  onChange: (n: string) => void;
}> = ({ label, id, value, onChange, ...props }) => {
  const [isDroped, dropHandlers] = useToggle();
  const [selectedOption, setSeletedOption] = useState<Option>({
    text: 'Net 30 Days',
    value: '30',
  });

  const ref = useRef<HTMLDivElement>(null);

  const optionClickHandler = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;

    setSeletedOption({
      text: target.textContent!,
      value: target.dataset.value!,
    });

    dropHandlers.off();
  };

  useEffect(() => {
    onChange(selectedOption.value);
  }, [onChange, selectedOption.value]);

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
