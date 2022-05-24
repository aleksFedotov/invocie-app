import React from 'react';
import { useFieldArray, FieldError, useFormContext } from 'react-hook-form';
import { Inputs } from '../form/InvoiceForm';

import { Wrapper, InvoiceItemsHeader } from './FormInvoiceItemsStyles';
import { Button } from '../../UI/button/ButtonStyles';
import FormItem from '../form-item/FormItem';

const FormInvoiceItems: React.FC<{}> = () => {
  const { control } = useFormContext<Inputs>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  });

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
          <FormItem key={item.id} remove={remove} ind={ind} />
        ))}
      </ul>
      <Button
        className="add_item_btn"
        type="button"
        onClick={() =>
          append({
            name: '',
            quantity: 0,
            price: 0,
            total: 0,
          })
        }
      >
        + Add New Item
      </Button>
    </Wrapper>
  );
};

export default FormInvoiceItems;
