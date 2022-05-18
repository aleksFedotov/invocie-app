import React from 'react';
import { IInvoice } from '../../../@types/types';
import dateFormat from '../../../helpers/dateFormat';
import useWindowWidth from '../../../hooks/useWindowWidth';
import InvoiceTable from '../invoice-table/InvoiceTable';

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
  const windowWidth = useWindowWidth();
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
            <h3>{dateFormat(data.createdAt)}</h3>
          </DataContainer>
          <DataContainer>
            <p>Payment Due</p>
            <h3>{dateFormat(data.paymentDue)}</h3>
          </DataContainer>
        </Dates>
        <DataContainer margin={windowWidth! > 750 ? '11rem' : '6rem'}>
          <p>Bill To</p>
          <h3>{data.clientName}</h3>
          <Address align="start">
            <p>{data.clientAddress.street}</p>
            <p>{data.clientAddress.city}</p>
            <p>{data.clientAddress.postCode}</p>
            <p>{data.clientAddress.country}</p>
          </Address>
        </DataContainer>
        <DataContainer>
          <p>Sent to</p>
          <h3>{data.clientEmail}</h3>
        </DataContainer>
      </ClientInfo>
      <InvoiceTable data={data.items} total={data.total} />
    </ContentWrapper>
  );
};

export default InvoiceViewContent;
