import React from 'react';
import handler from '../../../pages/api/hello';

import { InputWrapper, Input, LabelWrapper } from './FormInputStyles';

type Props = {
  id?: string;
  label?: string;
  error?: any;
  type?: string;
  placeholder?: string;
  invoiceItem?: boolean;
  disabled?: boolean;
  value?: string | number;
  onChange?: (data: string) => void;
};
// eslint-disable-next-line react/display-name
const FormInput: React.FC<Props> = React.forwardRef(
  (
    {
      id,
      label,
      error,
      type,
      placeholder,
      invoiceItem,
      disabled,
      value,
      onChange,
      ...rest
    },
    ref
  ) => {
    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (onChange) {
        const value = e.target.value;
        onChange(value);
      }
    };

    return (
      <InputWrapper isError={error} invoiceItem={invoiceItem}>
        <LabelWrapper invoiceItem={invoiceItem}>
          <label id={id}>{label}</label>
          {error && <span>{"Can't be empty"}</span>}
        </LabelWrapper>

        <Input
          isError={error}
          type={type ?? 'text'}
          placeholder={placeholder ?? ''}
          aria-label={id}
          value={value}
          // @ts-ignore:next-line
          ref={ref}
          {...rest}
          disabled={disabled}
          onChange={onChangeHandler}
          lang="en"
        />
      </InputWrapper>
    );
  }
);

export default FormInput;
