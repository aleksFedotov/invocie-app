import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { closeDeleteModal } from '../../../store/modalSlice';
import { useRouter } from 'next/router';
import { selectDemo } from '../../../store/demoSlice';
import { deleteInvoice } from '../../../store/demoSlice';

import useHttp from '../../../hooks/useHttp';

import { PoupWrapper, PopupButtons } from './DeletePopupStyles';
import { Button } from '../../UI/button/ButtonStyles';
import { parseCookies } from 'nookies';

const DeletePopup: React.FC<{ id: string; invoiceId?: string }> = ({
  id,
  invoiceId,
}) => {
  // Hooks
  const dispatch = useAppDispatch();
  const { isDemoMode } = useAppSelector(selectDemo);
  const router = useRouter();
  const { sendRequest } = useHttp();

  const deleteClickHandler = async () => {
    // If it is demod mode we just call deleteInvoice from store, if not when we send
    // request to server to delete invoice from db. After we close modal and redirect
    // to main page
    if (isDemoMode) {
      dispatch(deleteInvoice(id!));
    } else {
      const cookies = parseCookies();
      const userId: string = JSON.parse(cookies.userData).id;

      try {
        await sendRequest({
          url: `/api/invoice/delete/${invoiceId}`,
          method: 'DELETE',
          body: JSON.stringify({
            userId,
          }),
        });
      } catch (error) {}
    }
    dispatch(closeDeleteModal());
    router.push('/', undefined, { shallow: true });
  };

  // Animation variants for framer motion
  const popupAnimation = {
    hidden: { scale: 0 },
    visible: {
      scale: 1,
      transition: { type: 'spring', duration: 0.4 },
    },
    exit: {
      scale: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <PoupWrapper
      variants={popupAnimation}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <h2>Confirm Deletion</h2>
      <p>
        Are you sure you want to delete invoice <span>{id}</span>? This action
        cannot be undone.
      </p>
      <PopupButtons>
        <Button
          className="cancel_btn"
          onClick={() => dispatch(closeDeleteModal())}
        >
          Cancel
        </Button>
        <Button
          className="delete_btn"
          onClick={deleteClickHandler}
          data-testid="delete-popup"
        >
          Delete
        </Button>
      </PopupButtons>
    </PoupWrapper>
  );
};

export default DeletePopup;
