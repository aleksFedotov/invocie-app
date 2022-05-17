import React from 'react';
import { IInvoice } from '../../@types/types';

import {
  ContentWrapper,
  MainInfo,
  MainInfoLeft,
  ClientInfo,
  Dates,
  DataContainer,
  Address,
} from './InvoiceViewContentStyles';

const InvoiceViewContent: React.FC<{ data: IInvoice }> = ({ data }) => {
  return (
    <ContentWrapper>
      <MainInfo>
        <MainInfoLeft>
          <h2>
            <span>#</span>
            {data.id}
          </h2>
          <p>{data.description}</p>
        </MainInfoLeft>
        <Address align="end">
          <p>{data.senderAddress.street}</p>
          <p>{data.senderAddress.city}</p>
          <p>{data.senderAddress.postCode}</p>
          <p>{data.senderAddress.country}</p>
        </Address>
      </MainInfo>
      <ClientInfo>
        <Dates>
          <DataContainer>
            <p>Invoice Date</p>
            <h3>{data.createdAt}</h3>
          </DataContainer>
          <DataContainer>
            <p>Payment Due</p>
            <h3>{data.paymentDue}</h3>
          </DataContainer>
        </Dates>
        <DataContainer>
          <p>Bill To</p>
          <h3>{data.clientName}</h3>
          <Address align="start">
            <p>{data.senderAddress.street}</p>
            <p>{data.senderAddress.city}</p>
            <p>{data.senderAddress.postCode}</p>
            <p>{data.senderAddress.country}</p>
          </Address>
        </DataContainer>
        <DataContainer>
          <p>Sent to</p>
          <h3>{data.clientEmail}</h3>
        </DataContainer>
      </ClientInfo>
    </ContentWrapper>
  );
};

export default InvoiceViewContent;
