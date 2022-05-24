import React from 'react';
import {
  useForm,
  SubmitHandler,
  Controller,
  FormProvider,
} from 'react-hook-form';
import FormInput from '../../UI/form-input/FormInput';
import { Button } from '../../UI/button/ButtonStyles';
import DatePicker from '../../UI/date-picker/DatePicker';
import SelectDropdown from '../../UI/select-dropdown/SelectDropdown';
import FormInvoiceItems from '../form-incoice-items/FormInvoiceItems';
import { IInvoiceItem, IAddress } from '../../../@types/types';

import {
  FormSection,
  FormWrapper,
  BillFromSection,
  BillToSection,
  BottomSection,
  Wrapper,
} from './InvoiceFormStyles';

export type Inputs = {
  createdAt: string;
  description: string;
  paymentTerms: number;
  clientName: string;
  clientEmail: string;
  senderAddress: IAddress;
  clientAddress: IAddress;
  items: IInvoiceItem[];
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

  const methods = useForm<Inputs>();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = methods;

  const watchItems = watch('items');
  const itemsValue = getValues('items');

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);
  return (
    <FormProvider {...methods}>
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
              <Controller
                control={control}
                name="senderAddress.street"
                rules={{ required: true }}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <FormInput
                    id="senderStreet"
                    label="Street Address"
                    error={error}
                    onChange={(value: string) => onChange(value)}
                  />
                )}
              />

              <Controller
                control={control}
                name="senderAddress.city"
                rules={{ required: true }}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <FormInput
                    id="senderCity"
                    label="City"
                    error={error}
                    onChange={(value: string) => onChange(value)}
                  />
                )}
              />

              <Controller
                control={control}
                name="senderAddress.postCode"
                rules={{ required: true }}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <FormInput
                    id="senderPostCode"
                    label="Post Code"
                    error={error}
                    onChange={(value: string) => onChange(value)}
                  />
                )}
              />

              <Controller
                control={control}
                name="senderAddress.country"
                rules={{ required: true }}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <FormInput
                    id="senderCountry"
                    label="Contry"
                    error={error}
                    onChange={(value: string) => onChange(value)}
                  />
                )}
              />
            </BillFromSection>
          </FormSection>

          <FormSection>
            <p>Bill To</p>
            <BillToSection>
              <Controller
                control={control}
                name="clientName"
                rules={{ required: true }}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <FormInput
                    id="clientName"
                    label="Client’s Name"
                    error={error}
                    onChange={(value: string) => onChange(value)}
                  />
                )}
              />

              <Controller
                control={control}
                name="clientEmail"
                rules={{
                  required: true,
                  pattern:
                    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                }}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <FormInput
                    id="clientEmail"
                    label="Client’s Email"
                    placeholder="e.g. email@example.com"
                    error={error}
                    onChange={(value: string) => onChange(value)}
                  />
                )}
              />

              <Controller
                control={control}
                name="clientAddress.street"
                rules={{ required: true }}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <FormInput
                    id="clientStreet"
                    label="Street Address"
                    error={error}
                    onChange={(value: string) => onChange(value)}
                  />
                )}
              />

              <Controller
                control={control}
                name="clientAddress.city"
                rules={{ required: true }}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <FormInput
                    id="clientCity"
                    label="City"
                    error={error}
                    onChange={(value: string) => onChange(value)}
                  />
                )}
              />

              <Controller
                control={control}
                name="clientAddress.postCode"
                rules={{ required: true }}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <FormInput
                    id="clientPostCode"
                    label="Post Code"
                    error={error}
                    onChange={(value: string) => onChange(value)}
                  />
                )}
              />

              <Controller
                control={control}
                name="clientAddress.country"
                rules={{ required: true }}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <FormInput
                    id="clientCountry"
                    label="Country"
                    error={error}
                    onChange={(value: string) => onChange(value)}
                  />
                )}
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

            <Controller
              control={control}
              name="description"
              rules={{ required: true }}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <FormInput
                  id="description"
                  label="Project Description"
                  placeholder="e.g. Graphic Design Service"
                  error={error}
                  onChange={(value: string) => onChange(value)}
                />
              )}
            />
          </BottomSection>

          <FormSection>
            <h3>Item List</h3>
            {/* <Controller
            control={control}
            name="items"
            rules={{ required: true }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <FormInvoiceItems errors={error}/>
            )}
          /> */}
            <FormInvoiceItems
            // {...{ register }}
            // errors={errors?.items}
            // control={control}
            // setValue={setValue}
            // values={itemsValue}
            // watch={watchItems}
            />
          </FormSection>
        </Wrapper>

        <Button className="main_btn">Save & Send</Button>
      </FormWrapper>
    </FormProvider>
  );
};

export default InvoiceForm;
