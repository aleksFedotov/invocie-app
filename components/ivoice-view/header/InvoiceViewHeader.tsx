import React from 'react';
import { IInvoice } from '../../../@types/types';

import Status from '../../UI/status/Status';
import { HeaderWrapper, HeaderLeft } from './InvoiceViewHeaderStyle';
import ViewButtons from '../view-buttons/ViewButtons';
import { useAppSelector } from '../../../store/hooks';
import { selectDemo } from '../../../store/demoSlice';

const InvoiceViewHeader: React.FC<{ data: IInvoice }> = ({ data }) => {
  const { isDemoMode } = useAppSelector(selectDemo);
  return (
    <HeaderWrapper>
      <HeaderLeft>
        <span>Status</span>
        <Status status={data.status} />
      </HeaderLeft>
      <ViewButtons
        isMobile={false}
        invoiceId={isDemoMode ? data.id : data.id_db}
      />
    </HeaderWrapper>
  );
};

export default InvoiceViewHeader;
