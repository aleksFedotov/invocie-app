import React, { useState } from 'react';

import ArrowDownIcon from '../../public/assets/icon-arrow-down.svg';
import Filters from './drop-filters/Filters';

import {
  InvoicesHeaderWrapper,
  HeaderTextContent,
  HeaderCtx,
  InvoiceFitler,
  PlusIconWrapper,
} from './InvoicesHeaderStyles';

import { Button } from '../UI/button/ButtonStyles';
import PlusIcon from '../../public/assets/icon-plus.svg';
import { AnimatePresence } from 'framer-motion';
import useWindowWidth from '../../hooks/useWindowWidth';

const InvoicesHeader: React.FC<{ total: number }> = ({ total }) => {
  const [menuIsOpened, setMenuIsOpened] = useState<boolean>(false);
  const windowWidth = useWindowWidth();

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
          <span>
            {windowWidth && windowWidth < 650 ? 'Filter' : 'Filter by status'}
          </span>
          <ArrowDownIcon />
        </InvoiceFitler>
        <Button className="main_btn new_invoice" onClick={() => {}}>
          <PlusIconWrapper>
            <PlusIcon />
          </PlusIconWrapper>
          {windowWidth && windowWidth < 650 ? 'New' : 'New Invoice'}
        </Button>
      </HeaderCtx>
      <AnimatePresence>{menuIsOpened && <Filters />}</AnimatePresence>
    </InvoicesHeaderWrapper>
  );
};

export default InvoicesHeader;
