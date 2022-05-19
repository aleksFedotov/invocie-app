import React from 'react';
import { useAppDispatch } from '../../../store/hooks';
import { toggleDelteModal, toggleFormModal } from '../../../store/modalSlice';

import { Backdrop } from './ModalStyles';

const Modal: React.FC<{
  type: string;

  children?: React.ReactNode;
}> = ({ type, children }) => {
  const dispatch = useAppDispatch();
  const modalClickHandler = () => {
    if (type === 'delete') {
      dispatch(toggleDelteModal());
    } else dispatch(toggleFormModal());
  };

  return <Backdrop type={type}>{children}</Backdrop>;
};

export default Modal;
