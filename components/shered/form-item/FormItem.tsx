import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import DeleteIcon from '../../../public/assets/icon-delete.svg';
import { Inputs } from '../form/InvoiceForm';
import { Button } from '../../UI/button/ButtonStyles';
import FormInput from '../../UI/form-input/FormInput';
import { InvoiceItem } from './FormItemsStyles';
import moneyFormat from '../../../helpers/moneyFormat';

const FormItem: React.FC<{
  ind: number;
  remove: (ind: number) => void;
}> = ({ ind, remove }) => {
  const {
    control,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<Inputs>();

  const watchItems = watch('items');
  const watchItemPrice = watchItems[ind].price;
  const watchItemQty = watchItems[ind].quantity;

  const itemsErrors = errors.items;

  const setTotal = (qty: number, price: number) => {
    const total = qty * price;
    setValue(`items.${ind}.total`, total);
  };

  return (
    <InvoiceItem>
      <Controller
        control={control}
        name={`items.${ind}.name`}
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => (
          <FormInput
            id="itemName"
            error={itemsErrors && itemsErrors[ind]?.name}
            value={value}
            onChange={(data: string) => {
              onChange(data);
            }}
            label="Item Name"
            invoiceItem
          />
        )}
      />

      <Controller
        control={control}
        name={`items.${ind}.quantity`}
        rules={{ required: true, min: 1 }}
        render={({ field: { onChange, value } }) => (
          <FormInput
            id="quantity"
            type="number"
            error={itemsErrors && itemsErrors[ind]?.quantity}
            value={value}
            onChange={(data: string) => {
              setTotal(+data, watchItemPrice);
              onChange(+data);
            }}
            label="Qty."
            invoiceItem
          />
        )}
      />
      <Controller
        control={control}
        name={`items.${ind}.price`}
        rules={{ required: true, min: 1 }}
        render={({ field: { onChange, value } }) => (
          <FormInput
            id="price"
            type="number"
            error={itemsErrors && itemsErrors[ind]?.price}
            value={value.toFixed(2)}
            onChange={(data: string) => {
              setTotal(watchItemQty, +data);
              onChange(+data);
            }}
            label="Price"
            invoiceItem
          />
        )}
      />
      <Controller
        control={control}
        name={`items.${ind}.total`}
        render={({ field: { value } }) => (
          <FormInput
            id="itemName"
            type="number"
            value={value && value.toFixed(2)}
            label="Total"
            invoiceItem
            disabled
          />
        )}
      />

      <Button
        type="button"
        className="delete_item_btn"
        onClick={() => remove(ind)}
      >
        <DeleteIcon />
      </Button>
    </InvoiceItem>
  );
};

export default FormItem;
