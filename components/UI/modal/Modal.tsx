import React, { useEffect, useState, useRef } from 'react';
import ReactDOM from 'react-dom';

import { useAppDispatch } from '../../../store/hooks';

import { closeDeleteModal, closeFormModal } from '../../../store/modalSlice';

import { ModalOverlay, ModalWrapper } from './ModalStyles';

const Modal: React.FC<{ children?: React.ReactNode; type: string }> = ({
  children,
  type,
}) => {
  const [_document, setDocument] = useState<Document | null>(null);
  const dispatch = useAppDispatch();

  const modalWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setDocument(document);
  }, []);

  // useEffect(() => {
  //   const backDropHandler = (e: MouseEvent) => {
  //     const target = e.target as Node;
  //     if (
  //       modalWrapperRef.current &&
  //       !modalWrapperRef.current.contains(target)
  //     ) {
  //       if (type === 'delete') {
  //         dispatch(closeDeleteModal());
  //       } else {
  //         dispatch(closeFormModal());
  //       }
  //     }
  //   };
  //   setDocument(document);
  //   window.addEventListener('click', backDropHandler);
  //   return () => window.removeEventListener('click', backDropHandler);
  // }, [dispatch, type]);

  const modalContent = (
    <ModalOverlay type={type} id="modal">
      {/* <ModalWrapper ref={modalWrapperRef}> */}
      {children}
      {/* </ModalWrapper> */}
    </ModalOverlay>
  );

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
