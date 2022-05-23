import React from 'react';

import { InputWrapper, Input, LabelWrapper } from './FormInputStyles';

type Props = {
  id?: string;
  label?: string;
  error?: any;
  type?: string;
  placeholder?: string;
  isInvoiceItem?: boolean;
};
// eslint-disable-next-line react/display-name
const FormInput: React.FC<Props> = React.forwardRef(
  ({ id, label, error, type, placeholder, isInvoiceItem, ...rest }, ref) => {
    return (
      <InputWrapper isError={error} isInvoiceItem={isInvoiceItem}>
        <LabelWrapper isInvoiceItem={isInvoiceItem}>
          <label id={id}>{label}</label>
          {error && <span>{"Can't be empty"}</span>}
        </LabelWrapper>

        <Input
          isError={error}
          type={type ?? 'text'}
          placeholder={placeholder ?? ''}
          aria-label={id}
          // @ts-ignore:next-line
          ref={ref}
          {...rest}
        />
      </InputWrapper>
    );
  }
);

export default FormInput;
