import React from 'react';
import { useAppDispatch } from '../../../store/hooks';
import { closeDeleteModal } from '../../../store/modalSlice';
import { useRouter } from 'next/router';

import { PoupWrapper, PopupButtons } from './DeletePopupStyles';
import { Button } from '../../UI/button/ButtonStyles';

const DeletePopup: React.FC<{ id: string }> = ({ id }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const deleteClickHandler = () => {
    dispatch(closeDeleteModal());
    router.push('/');
  };
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
        <Button className="delete_btn" onClick={deleteClickHandler}>
          Delete
        </Button>
      </PopupButtons>
    </PoupWrapper>
  );
};

export default DeletePopup;
