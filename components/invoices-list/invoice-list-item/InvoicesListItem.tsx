import React from 'react';
import { IInvoice } from '../../../@types/types';

const InvoicesListItem: React.FC<{ data: IInvoice }> = ({ data }) => {
  return <div data-testid="invoice">{data.status}</div>;
};

export default InvoicesListItem;
