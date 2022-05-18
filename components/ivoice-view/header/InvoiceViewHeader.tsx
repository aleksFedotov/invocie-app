import React from 'react';
import { IInvoice } from '../../../@types/types';

import { Button } from '../../UI/button/ButtonStyles';
import Status from '../../UI/status/Status';
import {
  HeaderWrapper,
  HeaderLeft,
  HeaderRight,
} from './InvoiceViewHeaderStyle';
import ViewButtons from '../view-buttons/ViewButtons';

const InvoiceViewHeader: React.FC<{ data: IInvoice }> = ({ data }) => {
  return (
    <HeaderWrapper>
      <HeaderLeft>
        <span>Status</span>
        <Status status={data.status} />
      </HeaderLeft>
      <ViewButtons isMobile={false} />
    </HeaderWrapper>
  );
};

export default InvoiceViewHeader;
