import React from 'react';
import { IInvoice } from '../../../@types/types';
import {
  ListItem,
  ListItemLeft,
  ListItemRight,
  InvoiceId,
  DueDate,
  ClientName,
  Total,
} from './InvoicesListItemStyles';
import Status from '../../UI/status/Status';
import formatDate from '../../../helpers/dateFormat';
import moneyFormat from '../../../helpers/moneyFormat';
import Link from 'next/link';
import ArrowRightIcon from '../../../public/assets/icon-arrow-right.svg';
import useWindowWidth from '../../../hooks/useWindowWidth';
import { useRouter } from 'next/router';

const InvoicesListItem: React.FC<{ data: IInvoice }> = ({ data }) => {
  const windowWidth = useWindowWidth();
  const router = useRouter();

  const listItemHandler = () => {
    if (windowWidth && windowWidth > 650) return;
    router.push(`/invoices/${data.id}`);
  };
  return (
    <ListItem data-testid="invoice" onClick={listItemHandler}>
      <ListItemLeft>
        <InvoiceId>
          <span>#</span>
          {data.id}
        </InvoiceId>
        <DueDate className="due">Due {formatDate(data.paymentDue)}</DueDate>
        {windowWidth && windowWidth > 700 ? (
          <ClientName className="name">{data.clientName}</ClientName>
        ) : (
          <Total>&#163; {moneyFormat(data.total)}</Total>
        )}
      </ListItemLeft>
      <ListItemRight>
        {windowWidth && windowWidth > 700 ? (
          <Total>&#163; {moneyFormat(data.total)}</Total>
        ) : (
          <ClientName className="name">{data.clientName}</ClientName>
        )}

        <Status status={data.status} />

        {windowWidth && windowWidth > 700 && (
          <Link href={`/invoices/${data.id}`}>
            <ArrowRightIcon />
          </Link>
        )}
      </ListItemRight>
    </ListItem>
  );
};

export default InvoicesListItem;
