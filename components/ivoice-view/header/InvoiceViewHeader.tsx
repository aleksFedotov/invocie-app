import React from 'react';
import { IInvoice } from '../../../@types/types';

import Status from '../../UI/status/Status';
import { HeaderWrapper, HeaderLeft } from './InvoiceViewHeaderStyle';
import ViewButtons from '../view-buttons/ViewButtons';

const InvoiceViewHeader: React.FC<{ data: IInvoice }> = ({ data }) => {
  return (
    <HeaderWrapper>
      <HeaderLeft>
        <span>Status</span>
        <Status status={data.status} />
      </HeaderLeft>
      <ViewButtons isMobile={false} invoiceId={data.id} />
    </HeaderWrapper>
  );
};

export default InvoiceViewHeader;
