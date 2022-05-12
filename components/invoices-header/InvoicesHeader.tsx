import React, { useState } from 'react';

import ArrowDownIcon from '../../public/assets/icon-arrow-down.svg';

import {
  InvoicesHeaderWrapper,
  HeaderTextContent,
  HeaderCtx,
  InvoiceFitler,
} from './InvoicesHeaderStyles';

const InvoicesHeader: React.FC<{ total: number }> = ({ total }) => {
  const [menuIsOpened, setMenuIsOpened] = useState<boolean>(false);

  const filterClickHandler = () => {
    console.log('1');
    setMenuIsOpened((prevState) => !prevState);
  };

  return (
    <InvoicesHeaderWrapper>
      <HeaderTextContent>
        <h1>Invoices</h1>
        {total ? <p>There are {total} total invoices</p> : <p>No invoices</p>}
      </HeaderTextContent>
      <HeaderCtx>
        <InvoiceFitler onClick={filterClickHandler} isOpened={menuIsOpened}>
          <span>Filter by status</span>
          <ArrowDownIcon />
        </InvoiceFitler>
      </HeaderCtx>
    </InvoicesHeaderWrapper>
  );
};

export default InvoicesHeader;
