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
import Ripple from '../UI/ripple/Ripple';

const InvoicesHeader: React.FC<{ total: number }> = ({ total }) => {
  const [menuIsOpened, setMenuIsOpened] = useState<boolean>(false);
  const windowWidth = useWindowWidth();

  const filterClickHandler = () => {
    setMenuIsOpened((prevState) => !prevState);
  };

  let totalContent = <p>There are {total} total invoices</p>;

  if (total && windowWidth && windowWidth < 650) {
    totalContent = <p>{total} invoices</p>;
  } else if (total && windowWidth && windowWidth > 650) {
    totalContent = <p>There are {total} total invoices</p>;
  } else if (!total) {
    totalContent = <p>No invoices</p>;
  }

  return (
    <InvoicesHeaderWrapper>
      <HeaderTextContent>
        <h1>Invoices</h1>
        {totalContent}
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
          <Ripple color={'var(--color-white)'} duration={1000} />
        </Button>
      </HeaderCtx>
      <AnimatePresence>{menuIsOpened && <Filters />}</AnimatePresence>
    </InvoicesHeaderWrapper>
  );
};

export default InvoicesHeader;
