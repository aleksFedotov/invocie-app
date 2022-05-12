import React from 'react';
import useWindowWidth from '../../../hooks/useWindowWidth';
import { useRouter } from 'next/router';

import { LogoWrapper } from './LogoStyles';
import Image from 'next/image';

const Logo: React.FC = () => {
  const windowWidth = useWindowWidth();
  const router = useRouter();
  let imageSize = 40;

  if (typeof windowWidth !== 'undefined' && windowWidth < 800) {
    imageSize = 32;
  } else if (typeof windowWidth !== 'undefined' && windowWidth < 650) {
    imageSize = 28;
  }

  return (
    <LogoWrapper
      onClick={() => {
        router.push('/');
      }}
    >
      <Image
        src={'/assets/logo.svg'}
        width={imageSize}
        height={imageSize}
        alt="logo"
      />
    </LogoWrapper>
  );
};

export default Logo;
