import React from 'react';

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
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
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
      onBlur,
      ...rest
    },
    ref
  ) => {
    return (
      <InputWrapper isError={error} invoiceItem={invoiceItem}>
        <LabelWrapper invoiceItem={invoiceItem}>
          <label id={id}>{label}</label>
          {error && (
            <span role="alert">
              {/* {id === 'clientEmail' ? 'Invalid email' : "Can't be empty"} */}
              {error.message}
            </span>
          )}
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
          onChange={onChange}
          onBlur={onBlur}
          lang="en"
        />
      </InputWrapper>
    );
  }
);

export default FormInput;
