import React, { useEffect, useState, useRef } from 'react';
import ReactDOM from 'react-dom';

import { useAppDispatch } from '../../../store/hooks';

import { closeDeleteModal, closeFormModal } from '../../../store/modalSlice';

import { ModalOverlay, ModalWrapper } from './ModalStyles';

const Modal: React.FC<{ children?: React.ReactNode; type: string }> = ({
  children,
  type,
}) => {
  // State
  // if server side then null if clinet then document
  const [_document, setDocument] = useState<Document | null>(null);

  useEffect(() => {
    setDocument(document);
  }, []);

  const modalContent = (
    <ModalOverlay type={type} id="modal">
      {children}
    </ModalOverlay>
  );
  // if it is clinet side create portal to modal root div
  if (_document) {
    return ReactDOM.createPortal(
      modalContent,
      document.getElementById('modal-root')!
    );
  } else {
    return null;
  }
};

export default Modal;
