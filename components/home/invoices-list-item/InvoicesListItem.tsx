import React from 'react';
import { useRouter } from 'next/router';

import { IInvoiceListData } from '../../../@types/types';
import Status from '../../UI/status/Status';

import moneyFormat from '../../../libs/moneyFormat';
import ArrowRightIcon from '../../../public/assets/icon-arrow-right.svg';
import useWindowWidth from '../../../hooks/useWindowWidth';
import { format } from 'date-fns';

import {
  ListItem,
  ListItemLeft,
  ListItemRight,
  InvoiceId,
  DueDate,
  ClientName,
  Total,
} from './InvoicesListItemStyles';
const InvoicesListItem: React.FC<{ data: IInvoiceListData }> = ({ data }) => {
  const windowWidth = useWindowWidth();
  const router = useRouter();

  const listItemHandler = () => {
    router.push(`/invoice/${data.id}`);
  };
  return (
    <ListItem
      data-testid="invoice"
      onClick={listItemHandler}
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <ListItemLeft>
        <InvoiceId>
          <span>#</span>
          {data.id}
        </InvoiceId>
        <DueDate className="due">
          Due {format(new Date(data.paymentDue), 'dd MMM yyyy')}
        </DueDate>
        {windowWidth && windowWidth > 700 ? (
          <ClientName className="name">{data.clientName}</ClientName>
        ) : (
          <Total>{moneyFormat(data.total)}</Total>
        )}
      </ListItemLeft>
      <ListItemRight>
        {windowWidth && windowWidth > 700 ? (
          <Total>{moneyFormat(data.total)}</Total>
        ) : (
          <ClientName className="name">{data.clientName}</ClientName>
        )}

        <Status status={data.status} />

        {windowWidth && windowWidth > 700 && <ArrowRightIcon />}
      </ListItemRight>
    </ListItem>
  );
};

export default InvoicesListItem;
