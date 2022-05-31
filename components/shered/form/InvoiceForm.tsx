import React from 'react';
import {
  useForm,
  SubmitHandler,
  Controller,
  FormProvider,
} from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import FormInput from '../../UI/form-input/FormInput';
import { Button } from '../../UI/button/ButtonStyles';
import DatePicker from '../../UI/date-picker/DatePicker';
import SelectDropdown from '../../UI/select-dropdown/SelectDropdown';
import { useAppDispatch } from '../../../store/hooks';
import { closeFormModal } from '../../../store/modalSlice';
import IconArrowLeft from '../../../public/assets/icon-arrow-left.svg';
import Ripple from '../../UI/ripple/Ripple';
import useHttp from '../../../hooks/useHttp';
import FormInvoiceItems from '../form-incoice-items/FormInvoiceItems';
import { Inputs, IInvoice } from '../../../@types/types';
import generateData from '../../../helpers/generateData';

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
  ErrorMessage,
} from './InvoiceFormStyles';

const schema = yup
  .object()
  .shape({
    description: yup.string().required(),
    createdAt: yup.string().required(),
    paymentTerms: yup.number().required(),
    clientName: yup.string().required(),
    clientEmail: yup.string().email(),
    senderAddress: yup.object().shape({
      street: yup.string().required(),
      city: yup.string().required(),
      postCode: yup.string().required(),
      country: yup.string().required(),
    }),
    clientAddress: yup.object().shape({
      street: yup.string().required(),
      city: yup.string().required(),
      postCode: yup.string().required(),
      country: yup.string().required(),
    }),
    items: yup
      .array()
      .of(
        yup.object().shape({
          name: yup.string().required(),
          quantity: yup.number().min(1).required(),
          price: yup.number().min(1).required(),
        })
      )
      .min(1),
  })
  .required();

const InvoiceForm: React.FC<{
  create?: boolean;
  edit?: boolean;
  data?: IInvoice;
}> = ({ create, edit, data }) => {
  const dispatch = useAppDispatch();
  const { error, isLoading, sendRequest } = useHttp();

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

  const methods = useForm<Inputs>({
    // @ts-ignore:next-line
    defaultValues: data,
    resolver: yupResolver(schema),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
    getValues,
  } = methods;

  const values = getValues();

  const isErorrs = Object.keys(errors).length > 0;
  const isEmptyItemsArray =
    Object.keys(errors).length > 0 && !values.items.length;

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const generatedData = generateData(data);

    try {
      const res = await sendRequest({
        url: 'api/invoice/new',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...generatedData,
          userId: 'cl3sfjgqi0002a0w0jtc8bc4u',
        }),
      });
      const resData = res.json();
    } catch (error) {}
  };
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
                render={({ field: { onChange }, fieldState: { error } }) => (
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
                render={({ field: { onChange }, fieldState: { error } }) => (
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
                render={({ field: { onChange }, fieldState: { error } }) => (
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
                render={({ field: { onChange }, fieldState: { error } }) => (
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
                render={({ field: { onChange }, fieldState: { error } }) => (
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
                render={({ field: { onChange }, fieldState: { error } }) => (
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
                render={({ field: { onChange }, fieldState: { error } }) => (
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
                render={({ field: { onChange }, fieldState: { error } }) => (
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
                render={({ field: { onChange }, fieldState: { error } }) => (
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
                render={({ field: { onChange }, fieldState: { error } }) => (
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
              render={({ field: { onChange, value } }) => (
                <DatePicker
                  id="date"
                  label="Invoice Date"
                  isEdit={false}
                  value={value}
                  onChange={(date: string) => onChange(date)}
                />
              )}
            />
            <Controller
              control={control}
              name="paymentTerms"
              render={({ field: { onChange, value } }) => (
                <SelectDropdown
                  id="terms"
                  label="Payment Terms"
                  value={value}
                  onChange={(n: number) => onChange(n)}
                />
              )}
            />

            <Controller
              control={control}
              name="description"
              render={({ field: { onChange }, fieldState: { error } }) => (
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

          <div>
            {isErorrs && (
              <ErrorMessage>- All fields must be added</ErrorMessage>
            )}
            {isEmptyItemsArray && (
              <ErrorMessage>- An item must be added</ErrorMessage>
            )}
          </div>
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
                <Ripple color={'var(--color-white)'} duration={1000} />
              </Button>
            </div>
            <ButtonsRight>
              <Button className="save_btn">
                Save as Draft{' '}
                <Ripple color={'var(--color-white)'} duration={1000} />
              </Button>
              <Button className="main_btn">
                Save & Send{' '}
                <Ripple color={'var(--color-white)'} duration={1000} />
              </Button>
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
                <Ripple color={'var(--color-white)'} duration={1000} />
              </Button>
              <Button className="main_btn">
                Save Changes{' '}
                <Ripple color={'var(--color-white)'} duration={1000} />
              </Button>
            </ButtonsRight>
          </ButtonWrapper>
        )}
      </FormWrapper>
    </FormProvider>
  );
};

export default InvoiceForm;
