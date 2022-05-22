import React from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import FormInput from '../../UI/form-input/FormInput';
import { Button } from '../../UI/button/ButtonStyles';
import DatePicker from '../../UI/date-picker/DatePicker';
import SelectDropdown from '../../UI/select-dropdown/SelectDropdown';

import {
  FormSection,
  FormWrapper,
  BillFromSection,
  BillToSection,
  BottomSection,
  Wrapper,
} from './InvoiceFormStyles';

type Inputs = {
  example: string;
  exampleRequired: string;
  senderAddress: string;
  senderCity: string;
  senderPostCode: string;
  senederCountry: string;
  clientName: string;
  clientEmail: string;
  clientAddress: string;
  clientCity: string;
  clientPostCode: string;
  clientCountry: string;
  createdAt: string;
  terms: string;
  description: string;
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
    watch,
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
              error={errors.senderAddress}
              {...register('senderAddress', { required: true })}
            />

            <FormInput
              id="senderCity"
              label="City"
              error={errors.senderCity}
              {...register('senderCity', { required: true })}
            />
            <FormInput
              id="senderPostCode"
              label="Post Code"
              error={errors.senderPostCode}
              {...register('senderPostCode', { required: true })}
            />
            <FormInput
              id="senderCountry"
              label="Contry"
              error={errors.senederCountry}
              {...register('senederCountry', { required: true })}
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
              error={errors.clientAddress}
              {...register('clientAddress', { required: true })}
            />

            <FormInput
              id="clientCity"
              label="City"
              error={errors.clientCity}
              {...register('clientCity', { required: true })}
            />
            <FormInput
              id="clientPostCode"
              label="Post Code"
              error={errors.clientPostCode as any}
              {...register('clientPostCode', { required: true })}
            />
            <FormInput
              id="clientCountry"
              label="Country"
              error={errors.clientCountry}
              {...register('clientCountry', { required: true })}
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
            name="terms"
            render={(props) => (
              <SelectDropdown
                id="terms"
                label="Payment Terms"
                value={props.field.value}
                onChange={(n: string) => props.field.onChange(n)}
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
      </Wrapper>
      <Button className="main_btn">Save & Send</Button>
    </FormWrapper>
  );
};

export default InvoiceForm;
