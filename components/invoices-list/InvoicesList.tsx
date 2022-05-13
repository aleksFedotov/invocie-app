import React from 'react';

import { IInvoice } from '../../@types/types';

import { List } from './InvoicesListStyles';
import InvoicesListItem from './invoice-list-item/InvoicesListItem';

const InvoicesList: React.FC<{ data: IInvoice[] }> = ({ data }) => {
  return (
    <List>
      {data.map((invoice: IInvoice) => (
        <InvoicesListItem key={invoice.id} data={invoice} />
      ))}
    </List>
  );
};

export default InvoicesList;
