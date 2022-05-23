import React from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import FormInput from '../../UI/form-input/FormInput';
import { Button } from '../../UI/button/ButtonStyles';
import DatePicker from '../../UI/date-picker/DatePicker';
import SelectDropdown from '../../UI/select-dropdown/SelectDropdown';
import FormInvoiceItems from '../form-incoice-items/FormInvoiceItems';

import {
  FormSection,
  FormWrapper,
  BillFromSection,
  BillToSection,
  BottomSection,
  Wrapper,
} from './InvoiceFormStyles';

type Item = {
  name: string;
  quantity: number;
  price: number;
  total: number;
};

type Address = {
  street: string;
  city: string;
  postCode: string;
  country: string;
};

export type Inputs = {
  createdAt: string;
  description: string;
  paymentTerms: number;
  clientName: string;
  clientEmail: string;
  senderAddress: Address;
  clientAddress: Address;
  items: Item[];
};

const InvoiceForm: React.FC = () => {
  const formAnimation = {
    hidden: {
      x: '-100%',
      transition: { duration: 0.75 },
    },
    visible: {
      x: 0,
      transition: { duration: 0.75 },
    },
  };

  const {
    register,
    handleSubmit,
    control,

    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);
  return (
    <FormWrapper
      variants={formAnimation}
      initial="hidden"
      animate="visible"
      exit="hidden"
      onSubmit={handleSubmit(onSubmit)}
      // autoComplete="off"
    >
      <h2>New Invoice</h2>
      <Wrapper>
        <FormSection>
          <p>Bill From</p>
          <BillFromSection>
            <FormInput
              id="senderAddress"
              label="Street Address"
              error={errors.senderAddress?.street}
              {...register('senderAddress.street', { required: true })}
            />

            <FormInput
              id="senderCity"
              label="City"
              error={errors.senderAddress?.city}
              {...register('senderAddress.city', { required: true })}
            />
            <FormInput
              id="senderPostCode"
              label="Post Code"
              error={errors.senderAddress?.postCode}
              {...register('senderAddress.postCode', { required: true })}
            />
            <FormInput
              id="senderCountry"
              label="Contry"
              error={errors.senderAddress?.country}
              {...register('senderAddress.country', { required: true })}
            />
          </BillFromSection>
        </FormSection>

        <FormSection>
          <p>Bill To</p>
          <BillToSection>
            <FormInput
              id="clientName"
              label="Client’s Name"
              error={errors.clientName}
              {...register('clientName', { required: true })}
            />
            <FormInput
              id="clientEmail"
              label="Client’s Email"
              placeholder="e.g. email@example.com"
              error={errors.clientEmail}
              {...register('clientEmail', {
                required: true,
                pattern:
                  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              })}
            />
            <FormInput
              id="clientAddress"
              label="Street Address"
              error={errors.clientAddress?.street}
              {...register('clientAddress.street', { required: true })}
            />

            <FormInput
              id="clientCity"
              label="City"
              error={errors.clientAddress?.city}
              {...register('clientAddress.city', { required: true })}
            />
            <FormInput
              id="clientPostCode"
              label="Post Code"
              error={errors.clientAddress?.postCode}
              {...register('clientAddress.postCode', { required: true })}
            />
            <FormInput
              id="clientCountry"
              label="Country"
              error={errors.clientAddress?.country}
              {...register('clientAddress.country', { required: true })}
            />
          </BillToSection>
        </FormSection>

        <BottomSection>
          <Controller
            control={control}
            name="createdAt"
            render={(props) => (
              <DatePicker
                id="date"
                label="Invoice Date"
                isEdit={false}
                value={props.field.value}
                onChange={(date: string) => props.field.onChange(date)}
              />
            )}
          />
          <Controller
            control={control}
            name="paymentTerms"
            render={(props) => (
              <SelectDropdown
                id="terms"
                label="Payment Terms"
                value={props.field.value}
                onChange={(n: number) => props.field.onChange(n)}
              />
            )}
          />
          <FormInput
            id="description"
            label="Project Description"
            placeholder="e.g. Graphic Design Service"
            error={errors.description}
            {...register('description', { required: true })}
          />
        </BottomSection>

        <FormSection>
          <h3>Item List</h3>
          <FormInvoiceItems {...{ register }} errors={errors?.items} />
        </FormSection>
      </Wrapper>

      <Button className="main_btn">Save & Send</Button>
    </FormWrapper>
  );
};

export default InvoiceForm;
