import React from 'react';
import useWindowWidth from '../../../hooks/useWindowWidth';
import { useRouter } from 'next/router';
import { useAppDispatch } from '../../../store/hooks';
import { closeDeleteModal, closeFormModal } from '../../../store/modalSlice';

import { LogoWrapper } from './LogoStyles';
import Image from 'next/image';

const Logo: React.FC = () => {
  const windowWidth = useWindowWidth();
  const router = useRouter();
  const dispatch = useAppDispatch();
  let imageSize = 40;

  if (windowWidth < 650) {
    imageSize = 28;
  } else if (windowWidth < 800) {
    imageSize = 32;
  }

  return (
    <LogoWrapper
      onClick={() => {
        dispatch(closeDeleteModal());
        dispatch(closeFormModal());
        router.push('/');
      }}
    >
      <Image
        src={'/assets/logo.svg'}
        width={imageSize}
        height={imageSize}
        alt="logo"
        data-size={imageSize}
      />
    </LogoWrapper>
  );
};

export default Logo;
