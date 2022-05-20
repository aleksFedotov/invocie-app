import React from 'react';

import { InputWrapper, Input, LabelWrapper } from './FormInputStyles';

type Props = {
  id?: string;
  label?: string;
  error?: any;
  type?: string;
  placeholder?: string;
};
// eslint-disable-next-line react/display-name
const FormInput: React.FC<Props> = React.forwardRef(
  ({ id, label, error, type, placeholder, ...rest }, ref) => {
    return (
      <InputWrapper isError={error}>
        <LabelWrapper>
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
