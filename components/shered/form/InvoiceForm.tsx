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
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { closeFormModal } from '../../../store/modalSlice';
import IconArrowLeft from '../../../public/assets/icon-arrow-left.svg';
import Ripple from '../../UI/ripple/Ripple';
import useHttp from '../../../hooks/useHttp';
import FormInvoiceItems from '../form-incoice-items/FormInvoiceItems';
import { Inputs, IInvoice } from '../../../@types/types';
import generateData from '../../../libs/generateData';
import defaultValues from '../../../libs/defaultInvoiceValues';
import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';
import { selectDemo } from '../../../store/demoSlice';
import { createInvoice, editInvoice } from '../../../store/demoSlice';

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
import LoadingSpinner from '../../UI/loading/LoadingSpinner';

// validation shema
const schema = yup.object().shape({
  description: yup.string().required("Can't be empty"),
  clientName: yup.string().required("Can't be empty"),
  clientEmail: yup.string().email('Invalid email').required('Invalid email'),
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
  items: yup
    .array()
    .of(
      yup.object().shape({
        name: yup.string().required("Can't be empty"),
        quantity: yup.number().min(1).required("Can't be empty"),
        price: yup.number().min(1).required("Can't be empty"),
      })
    )
    .min(1),
});

const InvoiceForm: React.FC<{
  create?: boolean;
  edit?: boolean;
  data?: IInvoice;
}> = ({ create, edit, data }) => {
  // Hooks
  const dispatch = useAppDispatch();
  const { error, isLoading, sendRequest } = useHttp();
  const { isDemoMode } = useAppSelector(selectDemo);
  const router = useRouter();

  // refresh page after submiting and etc
  const refreshData = () => router.replace(router.asPath);

  // Animation varians for framer-motion
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

  // React hook form settings

  // Get all methods from useForm hook called with default values
  // if we have it and yup scheam as resolver
  const methods = useForm<Inputs>({
    // @ts-ignore:next-line
    defaultValues: data ? data : defaultValues,
    resolver: yupResolver(schema),
  });

  // Destructuring method object so we can use function and variables n page
  const {
    handleSubmit,
    control,
    formState: { errors },
    getValues,
  } = methods;

  // Getting current values from form so we can use it if user want to save as draft. In this case we do not want to go through form validtaion as we will not apass validation, we need just incomplete form data
  const values = getValues();

  // Two types of error if some field are invalid and we have no items Because we have arryFiels from reac hook form it return error in format {items: { type : requried, ref: undefined}right after clicking on add item. So do work around it we have to make sure that even we have items object in errors should not have type === required.
  const isErorrs =
    Object.keys(errors).length > 0 &&
    typeof errors.items !== 'undefined' &&
    // @ts-ignore
    errors.items.type !== 'required';
  const isEmptyItemsArray =
    Object.keys(errors).length > 0 && !values.items.length;

  // Submit handling
  const onSubmit: SubmitHandler<Inputs> = async (formData) => {
    // We generate data in correct format and give it id and status pending
    const generatedData = generateData(formData);

    // If it is demo mode we just call create action from store
    if (isDemoMode) {
      dispatch(
        create
          ? createInvoice(generatedData)
          : editInvoice({ id: data!.id, invoice: generatedData })
      );
    } else {
      // If its user mode when first of all need get userId from cookies to send it together with request to pass user validation on server side
      const cookies = parseCookies();
      const storedData = JSON.parse(cookies.userData);

      try {
        await sendRequest({
          url: create ? '/api/invoice/new' : '/api/invoice/edit',
          method: create ? 'POST' : 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: create
            ? JSON.stringify({
                ...generatedData,
                userId: storedData.id,
              })
            : JSON.stringify({
                ...generatedData,
                // for MongoDB
                _id: data!._id,
                userId: storedData.id,
              }),
        });
      } catch (error) {}
    }
    // Whatever it is demo mode or mot we close modal and refresh page
    dispatch(closeFormModal());
    refreshData();
  };

  // Save as draft handling
  const saveAsDraft = async () => {
    // We generate data in correct format and give it id and status draft
    const generatedData = generateData(values, 'draft');

    // If it is demo mode we just call create action from store
    if (isDemoMode) {
      dispatch(createInvoice(generatedData));
    } else {
      const cookies = parseCookies();
      const storedData = JSON.parse(cookies.userData);

      try {
        await sendRequest({
          url: 'api/invoice/new',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...generatedData,

            userId: storedData.id,
          }),
        });
      } catch (error) {}
    }
    dispatch(closeFormModal());
    refreshData();
  };
  return (
    // form provide so we have access to all functionality in nested form
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
          data-testid="backBtn"
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
        {error && (
          <ErrorMessage data-testid="mainErorrMessage">{error}</ErrorMessage>
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
