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
import defaultValues from '../../../helpers/defaultInvoiceValues';
import { useRouter } from 'next/router';

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
import LoadingSpinner from '../../UI/loading/loading-spinner/LoadingSpinner';

// validation shema
const schema = yup
  .object()
  .shape({
    description: yup.string().required("Can't be empty"),
    clientName: yup.string().required("Can't be empty"),
    clientEmail: yup.string().email().required('Invalid email'),
    senderAddress: yup.object().shape({
      street: yup.string().required("Can't be empty"),
      city: yup.string().required("Can't be empty"),
      postCode: yup.string().required("Can't be empty"),
      country: yup.string().required("Can't be empty"),
    }),
    clientAddress: yup.object().shape({
      street: yup.string().required("Can't be empty"),
      city: yup.string().required("Can't be empty"),
      postCode: yup.string().required("Can't be empty"),
      country: yup.string().required("Can't be empty"),
    }),
    items: yup.array().of(
      yup.object().shape({
        name: yup.string().required("Can't be empty"),
        quantity: yup.number().min(1).required("Can't be empty"),
        price: yup.number().min(1).required("Can't be empty"),
      })
    ),
  })
  .required();

const InvoiceForm: React.FC<{
  create?: boolean;
  edit?: boolean;
  data?: IInvoice;
}> = ({ create, edit, data }) => {
  const dispatch = useAppDispatch();
  const { error, isLoading, sendRequest } = useHttp();

  // refresh page after submiting and etc
  const router = useRouter();
  const refreshData = () => router.replace(router.asPath);

  // framer-motion animation options

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

  // react hook form settings

  const methods = useForm<Inputs>({
    // @ts-ignore:next-line
    defaultValues: data ? data : defaultValues,
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

  // submit handling

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const generatedData = generateData(data);

    try {
      await sendRequest({
        url: create ? '/api/invoice/new' : '/api/invoice/edit',
        method: create ? 'POST' : 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...generatedData,
          userId: 'cl3sfjgqi0002a0w0jtc8bc4u',
        }),
      });
      dispatch(closeFormModal());
      refreshData();
    } catch (error) {}
  };

  // save as draft handling

  const saveAsDraft = async () => {
    const generatedData = generateData(values, 'draft');

    try {
      await sendRequest({
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
      dispatch(closeFormModal());
      refreshData();
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
        {isLoading && <LoadingSpinner asOverlay text="Submitting..." />}
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
        {error && <ErrorMessage>{error}</ErrorMessage>}
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
                    value={value}
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
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <FormInput
                    id="senderCity"
                    label="City"
                    error={error}
                    value={value}
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
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <FormInput
                    id="senderPostCode"
                    label="Post Code"
                    error={error}
                    value={value}
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
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <FormInput
                    id="senderCountry"
                    label="Contry"
                    error={error}
                    value={value}
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
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <FormInput
                    id="clientName"
                    label="Client’s Name"
                    error={error}
                    value={value}
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
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <FormInput
                    id="clientEmail"
                    label="Client’s Email"
                    placeholder="e.g. email@example.com"
                    error={error}
                    value={value}
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
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <FormInput
                    id="clientStreet"
                    label="Street Address"
                    error={error}
                    value={value}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      const data = event.target.value;
                      onChange(data);
                    }}
                  />
                )}
              />

              {/* !!!! */}
              <Controller
                control={control}
                name="clientAddress.city"
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <FormInput
                    id="clientCity"
                    label="City"
                    error={error}
                    value={value}
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
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <FormInput
                    id="clientPostCode"
                    label="Post Code"
                    error={error}
                    value={value}
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
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <FormInput
                    id="clientCountry"
                    label="Country"
                    error={error}
                    value={value}
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
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <FormInput
                  id="description"
                  label="Project Description"
                  placeholder="e.g. Graphic Design Service"
                  error={error}
                  value={value}
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
              <Button className="save_btn" type="button" onClick={saveAsDraft}>
                Save as Draft
                <Ripple color={'var(--color-white)'} duration={1000} />
              </Button>
              <Button className="main_btn">
                Save & Send
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
                Save Changes
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
