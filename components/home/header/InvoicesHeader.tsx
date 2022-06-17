import React, { useState } from 'react';
import { useAppDispatch } from '../../../store/hooks';
import { openFormModal } from '../../../store/modalSlice';

import ArrowDownIcon from '../../../public/assets/icon-arrow-down.svg';
import Filters from '../drop-filters/Filters';

import {
  InvoicesHeaderWrapper,
  HeaderTextContent,
  HeaderCtx,
  InvoiceFitler,
  PlusIconWrapper,
} from './InvoicesHeaderStyles';

import { Button } from '../../UI/button/ButtonStyles';
import PlusIcon from '../../../public/assets/icon-plus.svg';
import { AnimatePresence } from 'framer-motion';
import useWindowWidth from '../../../hooks/useWindowWidth';
import Ripple from '../../UI/ripple/Ripple';

const InvoicesHeader: React.FC<{ total: number }> = ({ total }) => {
  const [menuIsOpened, setMenuIsOpened] = useState<boolean>(false);
  const windowWidth = useWindowWidth();
  const dispatch = useAppDispatch();

  const filterClickHandler = () => {
    setMenuIsOpened((prevState) => !prevState);
  };

  let totalContent;

  if (total && windowWidth < 650) {
    totalContent = (
      <p data-testid="total-text" data-value={total}>
        {total} invoices
      </p>
    );
  } else if (total && windowWidth > 650) {
    totalContent = (
      <p data-testid="total-text" data-value={total}>
        There are {total} total invoices
      </p>
    );
  } else if (!total) {
    totalContent = (
      <p data-testid="total-text" data-value={total}>
        No invoices
      </p>
    );
  }

  return (
    <InvoicesHeaderWrapper>
      <HeaderTextContent>
        <h1>Invoices</h1>
        {totalContent}
      </HeaderTextContent>
      <HeaderCtx>
        <InvoiceFitler onClick={filterClickHandler} isOpened={menuIsOpened}>
          <span>{windowWidth > 650 ? 'Filter by status' : 'Filter'}</span>
          <ArrowDownIcon />
        </InvoiceFitler>
        <Button
          className="main_btn new_invoice"
          onClick={() => {
            dispatch(openFormModal());
          }}
        >
          <PlusIconWrapper>
            <PlusIcon />
          </PlusIconWrapper>

          {windowWidth > 650 ? 'New Invoice' : 'New'}
          <Ripple color={'var(--color-white)'} duration={1000} />
        </Button>
      </HeaderCtx>
      <AnimatePresence>{menuIsOpened && <Filters />}</AnimatePresence>
    </InvoicesHeaderWrapper>
  );
};

export default InvoicesHeader;
