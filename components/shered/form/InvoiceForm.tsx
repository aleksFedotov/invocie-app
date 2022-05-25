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
import { useAppDispatch } from '../../../store/hooks';
import { closeFormModal } from '../../../store/modalSlice';
import IconArrowLeft from '../../../public/assets/icon-arrow-left.svg';

import FormInvoiceItems from '../form-incoice-items/FormInvoiceItems';
import { IInvoiceItem, IAddress, IInvoice } from '../../../@types/types';

import {
  FormSection,
  FormWrapper,
  BillFromSection,
  BillToSection,
  BottomSection,
  Wrapper,
  ButtonWrapper,
  ButtonsRight,
  Shadow,
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

const InvoiceForm: React.FC<{
  create?: boolean;
  edit?: boolean;
  data?: IInvoice;
}> = ({ create, edit, data }) => {
  const dispatch = useAppDispatch();
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

  const { handleSubmit, control } = methods;

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);
  return (
    <FormProvider {...methods}>
      <FormWrapper
        variants={formAnimation}
        initial="hidden"
        animate="visible"
        exit="hidden"
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
      >
        <Button
          className="back_btn"
          onClick={() => {
            dispatch(closeFormModal());
          }}
          type="button"
        >
          <IconArrowLeft />
          Go Back
        </Button>
        {create && <h2>New Invoice</h2>}
        {edit && (
          <h2>
            Edit <span>#</span>
            {data?.id}
          </h2>
        )}
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
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      const data = event.target.value;
                      onChange(data);
                    }}
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
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      const data = event.target.value;
                      onChange(data);
                    }}
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
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      const data = event.target.value;
                      onChange(data);
                    }}
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
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      const data = event.target.value;
                      onChange(data);
                    }}
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
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      const data = event.target.value;
                      onChange(data);
                    }}
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
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      const data = event.target.value;
                      onChange(data);
                    }}
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
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      const data = event.target.value;
                      onChange(data);
                    }}
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
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      const data = event.target.value;
                      onChange(data);
                    }}
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
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      const data = event.target.value;
                      onChange(data);
                    }}
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
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      const data = event.target.value;
                      onChange(data);
                    }}
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
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    const data = event.target.value;
                    onChange(data);
                  }}
                />
              )}
            />
          </BottomSection>

          <FormSection>
            <h3>Item List</h3>
            <FormInvoiceItems />
          </FormSection>
        </Wrapper>
        <Shadow />
        {create && (
          <ButtonWrapper>
            <div>
              <Button
                className="discard_btn"
                type="button"
                onClick={() => {
                  dispatch(closeFormModal());
                }}
              >
                Discard
              </Button>
            </div>
            <ButtonsRight>
              <Button className="save_btn">Save as Draft</Button>
              <Button className="main_btn">Save & Send</Button>
            </ButtonsRight>
          </ButtonWrapper>
        )}
        {edit && (
          <ButtonWrapper>
            <div></div>
            <ButtonsRight edit>
              <Button
                className="cancel_btn"
                type="button"
                onClick={() => {
                  dispatch(closeFormModal());
                }}
              >
                Cancel
              </Button>
              <Button className="main_btn">Save Changes</Button>
            </ButtonsRight>
          </ButtonWrapper>
        )}
      </FormWrapper>
    </FormProvider>
  );
};

export default InvoiceForm;
