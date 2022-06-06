import React from 'react';
import { useAppDispatch } from '../../../store/hooks';
import { openDeleteModal, openFormModal } from '../../../store/modalSlice';

import { ButtonsWrapper } from './ViewButtonsStyles';
import { Button } from '../../UI/button/ButtonStyles';
import Ripple from '../../UI/ripple/Ripple';
import useHttp from '../../../hooks/useHttp';
import { useRouter } from 'next/router';

const ViewButtons: React.FC<{ isMobile: boolean; invoiceId?: string }> = ({
  isMobile,
  invoiceId,
}) => {
  const dispatch = useAppDispatch();
  const { sendRequest } = useHttp();

  // refresh page after submiting and etc
  const router = useRouter();
  const refreshData = () => router.replace(router.asPath);

  const paidHanlder = async () => {
    try {
      const res = await sendRequest({
        url: `/api/invoice/status/${invoiceId}`,
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: 'paid',
        }),
      });
    } catch (error) {}
    refreshData();
  };
  return (
    <ButtonsWrapper mobile={isMobile}>
      <Button
        className="edit_btn"
        onClick={() => {
          dispatch(openFormModal());
        }}
      >
        Edit
        <Ripple color={'var(--color-white)'} duration={1000} />
      </Button>
      <Button
        className="delete_btn"
        onClick={() => dispatch(openDeleteModal())}
      >
        Delete
        <Ripple color={'var(--color-white)'} duration={1000} />
      </Button>
      <Button className="main_btn" onClick={paidHanlder}>
        Mark as Paid
        <Ripple color={'var(--color-white)'} duration={1000} />
      </Button>
    </ButtonsWrapper>
  );
};

export default ViewButtons;
