import React from 'react';
import { AnimatePresence } from 'framer-motion';

import { IInvoiceListData } from '../../@types/types';

import { List } from './InvoicesListStyles';
import InvoicesListItem from './invoice-list-item/InvoicesListItem';

const InvoicesList: React.FC<{ data: IInvoiceListData[] }> = ({ data }) => {
  return (
    <AnimatePresence>
      <List>
        {data.map((invoice: IInvoiceListData) => (
          <InvoicesListItem key={invoice.id} data={invoice} />
        ))}
      </List>
    </AnimatePresence>
  );
};

export default InvoicesList;
