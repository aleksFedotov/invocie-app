import React from 'react';
import { useAppDispatch } from '../../../store/hooks';
import { openDeleteModal } from '../../../store/modalSlice';

import { ButtonsWrapper } from './ViewButtonsStyles';
import { Button } from '../../UI/button/ButtonStyles';
import Ripple from '../../UI/ripple/Ripple';

const ViewButtons: React.FC<{ isMobile: boolean }> = ({ isMobile }) => {
  const dispatch = useAppDispatch();
  return (
    <ButtonsWrapper mobile={isMobile}>
      <Button className="edit_btn">
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
      <Button className="main_btn">
        Mark as Read
        <Ripple color={'var(--color-white)'} duration={1000} />
      </Button>
    </ButtonsWrapper>
  );
};

export default ViewButtons;
