import React from 'react';
import { useAppDispatch } from '../../../store/hooks';
import { openDeleteModal, openFormModal } from '../../../store/modalSlice';
import { markAsPaid } from '../../../store/demoSlice';

import { ButtonsWrapper } from './ViewButtonsStyles';
import { Button } from '../../UI/button/ButtonStyles';
import Ripple from '../../UI/ripple/Ripple';
import useHttp from '../../../hooks/useHttp';
import { useRouter } from 'next/router';
import { useAppSelector } from '../../../store/hooks';
import { selectDemo } from '../../../store/demoSlice';

//

const ViewButtons: React.FC<{ isMobile: boolean; invoiceId?: string }> = ({
  isMobile,
  invoiceId,
}) => {
  // Hooks
  const dispatch = useAppDispatch();
  const { sendRequest } = useHttp();
  const { isDemoMode } = useAppSelector(selectDemo);
  const router = useRouter();

  // refresh page after submiting and etc
  const refreshData = () => router.replace(router.asPath);

  const paidHanlder = async () => {
    // If its demo mode when we just call markAsPaid actio form store
    // otherwise we send request to server to update data in db and refresh
    // page to show changes
    if (isDemoMode) {
      dispatch(markAsPaid(invoiceId!));
    } else {
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
    }
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
