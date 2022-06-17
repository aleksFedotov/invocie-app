import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { setFitlers, selectFilters } from '../../../store/filterSlice';

import { FiltersLabel, FiltersInput, FiltersCheckBox } from './CheckboxStyles';
import CheckIcon from '../../../public/assets/icon-check.svg';

const CheckBox: React.FC<{ label: string }> = ({ label }) => {
  // Hooks
  const dispatch = useAppDispatch();
  const filters = useAppSelector(selectFilters);

  const isChecked = filters.includes(label.toLowerCase());
  const checkboxHandler = () => {
    dispatch(setFitlers(label));
  };
  return (
    <FiltersLabel data-testid="checkbox">
      <FiltersInput type="checkbox" onChange={checkboxHandler} />
      <FiltersCheckBox isChecked={isChecked} aria-hidden="true">
        <CheckIcon />
      </FiltersCheckBox>
      <p>{label}</p>
    </FiltersLabel>
  );
};

export default CheckBox;
