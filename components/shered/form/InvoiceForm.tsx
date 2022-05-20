import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import FormInput from '../../UI/form-input/FormInput';
import { Button } from '../../UI/button/ButtonStyles';

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
    >
      <h2>New Invoice</h2>
      <Wrapper>
        <FormSection>
          <p>Bill From</p>
          <BillFromSection>
            <FormInput
              id="senderAddress"
              label="Street Address"
              // @ts-ignore:next-line
              error={errors.senderAddress}
              // @ts-ignore:next-line
              {...register('senderAddress', { required: true })}
            />

            <FormInput
              id="city"
              label="City"
              // @ts-ignore:next-line
              error={errors.city}
              // @ts-ignore:next-line
              {...register('city', { required: true })}
            />
            <FormInput
              id="code"
              label="Post Code"
              // @ts-ignore:next-line
              error={errors.code}
              // @ts-ignore:next-line
              {...register('code', { required: true })}
            />
            <FormInput
              id="country"
              label="Country"
              // @ts-ignore:next-line
              error={errors.country}
              // @ts-ignore:next-line
              {...register('country', { required: true })}
            />
          </BillFromSection>
        </FormSection>
        <FormSection>
          <p>Bill To</p>
          <BillToSection>
            <FormInput
              id="clientName"
              label="Client’s Name"
              // @ts-ignore:next-line
              error={errors.clientName}
              // @ts-ignore:next-line
              {...register('clientName', { required: true })}
            />
            <FormInput
              id="clientEmail"
              label="Client’s Email"
              placeholder="e.g. email@example.com"
              // @ts-ignore:next-line
              error={errors.clientEmail}
              // @ts-ignore:next-line
              {...register('clientEmail', {
                required: true,
                pattern:
                  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              })}
            />
            <FormInput
              id="clientAddress"
              label="Street Address"
              // @ts-ignore:next-line
              error={errors.clientAddress}
              // @ts-ignore:next-line
              {...register('clientAddress', { required: true })}
            />

            <FormInput
              id="city"
              label="City"
              // @ts-ignore:next-line
              error={errors.city}
              // @ts-ignore:next-line
              {...register('city', { required: true })}
            />
            <FormInput
              id="code"
              label="Post Code"
              // @ts-ignore:next-line
              error={errors.code}
              // @ts-ignore:next-line
              {...register('code', { required: true })}
            />
            <FormInput
              id="country"
              label="Country"
              // @ts-ignore:next-line
              error={errors.country}
              // @ts-ignore:next-line
              {...register('country', { required: true })}
            />
          </BillToSection>
        </FormSection>

        <BottomSection>
          <FormInput
            id="createdAt"
            label="Invoice Date"
            type="date"
            // @ts-ignore:next-line
            error={errors.createdAt}
            // @ts-ignore:next-line
            {...register('createdAt', { required: true })}
          />
          <FormInput
            id="terms"
            label="Payment Terms"
            // @ts-ignore:next-line
            error={errors.city}
            // @ts-ignore:next-line
            {...register('terms', { required: true })}
          />

          <FormInput
            id="description"
            label="Project Description"
            placeholder="e.g. Graphic Design Service"
            // @ts-ignore:next-line
            error={errors.description}
            // @ts-ignore:next-line
            {...register('description', { required: true })}
          />
        </BottomSection>
      </Wrapper>
      <Button className="main_btn">Save & Send</Button>
    </FormWrapper>
  );
};

export default InvoiceForm;
