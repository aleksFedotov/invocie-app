import React from 'react';
import useWindowWidth from '../../../hooks/useWindowWidth';

import { AvatarWrapper } from './AvatarStyles';
import Image from 'next/image';

const Avatar: React.FC<{ image: string }> = ({ image }) => {
  const windowWidth = useWindowWidth();
  let imageSize = 40;

  if (typeof windowWidth !== 'undefined' && windowWidth < 800) {
    imageSize = 32;
  }
  return (
    <AvatarWrapper>
      <Image src={image} width={imageSize} height={imageSize} alt="avatar" />
    </AvatarWrapper>
  );
};

export default Avatar;
