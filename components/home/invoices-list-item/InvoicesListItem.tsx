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
  // Hooks
  const windowWidth = useWindowWidth();
  const router = useRouter();

  const listItemHandler = () => {
    // If we click on item user redirects to invoice details page
    router.push(`/invoice/${data.id}`);
  };
  return (
    <ListItem
      data-testid="invoice"
      onClick={listItemHandler}
      // Animation variants for framer motion
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

        {/* Depends on widow size from useWindowWidth hook
        we render diffent layout of list item */}
        {windowWidth > 700 ? (
          <ClientName className="name" data-testid="item-left">
            {data.clientName}
          </ClientName>
        ) : (
          <Total data-testid="item-left">{moneyFormat(data.total)}</Total>
        )}
      </ListItemLeft>
      <ListItemRight>
        {windowWidth > 700 ? (
          <Total data-testid="item-right">{moneyFormat(data.total)}</Total>
        ) : (
          <ClientName className="name" data-testid="item-right">
            {data.clientName}
          </ClientName>
        )}

        <Status status={data.status} />

        {windowWidth && windowWidth > 700 && <ArrowRightIcon role="img" />}
      </ListItemRight>
    </ListItem>
  );
};

export default InvoicesListItem;
