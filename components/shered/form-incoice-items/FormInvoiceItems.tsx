import React from 'react';
import {
  useForm,
  useFieldArray,
  UseFormRegister,
  FieldError,
} from 'react-hook-form';
import { Inputs } from '../form/InvoiceForm';

import {
  Wrapper,
  InvoiceItemsHeader,
  InvoiceItem,
} from './FormInvoiceItemsStyles';
import { Button } from '../../UI/button/ButtonStyles';
import FormInput from '../../UI/form-input/FormInput';
import DeleteIcon from '../../../public/assets/icon-delete.svg';

type Errors = {
  name?: FieldError | undefined;
  quantity?: FieldError | undefined;
  price?: FieldError | undefined;
  total?: FieldError | undefined;
};

const FormInvoiceItems: React.FC<{
  register: UseFormRegister<Inputs>;
  errors: Errors[] | undefined;
}> = ({ register, errors }) => {
  const { control } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  });

  // const [nameError, qtyError, priceError, totalError] = errors;

  // console.log(nameError, qtyError, priceError, totalError);

  console.log(errors);
  return (
    <Wrapper>
      <InvoiceItemsHeader>
        <p>Item Name</p>
        <p>Qty.</p>
        <p>Price</p>
        <p>Total</p>
        <p></p>
      </InvoiceItemsHeader>
      <ul>
        {fields.map((item, ind) => (
          <InvoiceItem key={item.id}>
            <FormInput
              id={`items[${ind}].name`}
              error={errors?.length && errors![ind].name}
              {...register(`items.${ind}.name`, { required: true })}
              label="Name"
              isInvoiceItem={true}
            />
            <FormInput
              id={`items[${ind}].quantity`}
              error={errors?.length && errors![ind].quantity}
              {...register(`items.${ind}.quantity`, { required: true })}
              label="Qty."
              isInvoiceItem={true}
            />
            <FormInput
              id={`items[${ind}].price`}
              error={errors?.length && errors![ind].price}
              {...register(`items.${ind}.price`, { required: true })}
              label="Price"
              isInvoiceItem={true}
            />
            <FormInput
              id={`items[${ind}].total`}
              error={errors?.length && errors![ind].total}
              {...register(`items.${ind}.total`, { required: true })}
              label="Total"
              isInvoiceItem={true}
            />
            <Button
              type="button"
              className="delete_item_btn"
              onClick={() => remove(ind)}
            >
              <DeleteIcon />
            </Button>
          </InvoiceItem>
        ))}
      </ul>
      <Button
        className="add_item_btn"
        type="button"
        onClick={() =>
          append({ name: '', quantity: 1, price: null, total: null })
        }
      >
        + Add New Item
      </Button>
    </Wrapper>
  );
};

export default FormInvoiceItems;
