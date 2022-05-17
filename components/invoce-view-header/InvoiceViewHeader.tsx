import React from 'react';
import { IInvoice } from '../../@types/types';

import { Button } from '../UI/button/ButtonStyles';
import Status from '../UI/status/Status';
import {
  HeaderWrapper,
  HeaderLeft,
  HeaderRight,
} from './InvoiceViewHeaderStyle';

const InvoiceViewHeader: React.FC<{ data: IInvoice }> = ({ data }) => {
  return (
    <HeaderWrapper>
      <HeaderLeft>
        <span>Status</span>
        <Status status={data.status} />
      </HeaderLeft>
      <HeaderRight>
        <Button className="edit_btn">Edit</Button>
        <Button className="delete_btn">Delete</Button>
        <Button className="main_btn">Mark as Read</Button>
      </HeaderRight>
    </HeaderWrapper>
  );
};

export default InvoiceViewHeader;
